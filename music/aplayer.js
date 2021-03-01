// 检查 Aplayer 对象状态
function checkAPlayer() {
	if (APlayerController.player == undefined) {
		setAPlayerObject();
	} else {
		if (APlayerController.observer == undefined) {
			setAPlayerObserver();
		}
	}
}

// 设置全局播放器所对应的 aplyer 对象
function setAPlayerObject() {
	if (APlayerController.id == undefined) return;
	document.querySelectorAll('meting-js').forEach((item, index)=>{
		if (item.meta.id&&item.meta.id == APlayerController.id) {
			if (document.querySelectorAll('meting-js')[index].aplayer != undefined) {
 				APlayerController.player = document.querySelectorAll('meting-js')[index].aplayer;
				setAPlayerObserver();
			}
		}
	})
}

// 事件监听
function setAPlayerObserver() {
	try {
		APlayerController.player.on('play', function (e) {
			updateAPlayerControllerStatus();
			setData();
		});
		APlayerController.player.on('pause', function (e) {
			updateAPlayerControllerStatus();
		});
		APlayerController.player.on('volumechange', function (e) {
			onUpdateAPlayerVolume();
		});
		APlayerController.player.on('loadstart', function (e) {
			// 跳到下一曲时更新标题
			updateTitle();
		});
	$(document).ready(function(){
		checkAPlayer();
	  //获取记录,如果有数据就续播
	  if (typeof (Storage) !== 'undefined' && sessionStorage.getItem('playStatus') !== null) {
		  //获取保存的播放记录
		  var index = sessionStorage.getItem('musicIndex');
		  var playStatus = sessionStorage.getItem('playStatus');
		  var currentTime = sessionStorage.getItem('currentTime');
		  var mode = sessionStorage.getItem('mode');
		  var list = sessionStorage.getItem('list');
		  var lrc = sessionStorage.getItem('lrc');
		  try {
			APlayerController.player.list.switch(index);
			APlayerController.player.setMode(mode);
			//跳转到指定下标歌曲
			lrc === "false"
			  ? APlayerController.player.lrc && APlayerController.player.lrc.show()
			  : (APlayerController.player.template.lrcButton.classList.add(
				  "aplayer-icon-lrc-inactivity"
				),
				APlayerController.player.lrc && APlayerController.player.lrc.hide());
			list === "false"
			  ? APlayerController.player.list.show()
			  : APlayerController.player.list.hide(); //显示播放列表
			APlayerController.player.audio.currentTime = currentTime; //设置播放进度		
		  } catch (error) {
			console.log(error);
		  }
		  if(playStatus === 'false'){  //如果播放状态不是暂停,就播放
			  APlayerController.player.play();
		  }
	  }
	})
		// 监听音量手势
		APlayerController.volumeBarWrap = document.getElementsByClassName('nav volume')[0].children[0];
		APlayerController.volumeBar = APlayerController.volumeBarWrap.children[0]
		function updateAPlayerVolume(e) {
			let percentage = ((e.clientX || e.changedTouches[0].clientX) - APlayerController.volumeBar.getBoundingClientRect().left) / APlayerController.volumeBar.clientWidth;
			percentage = Math.max(percentage, 0);
			percentage = Math.min(percentage, 1);
			APlayerController.player.volume(percentage);
		}
		const thumbMove = (e) => {
				updateAPlayerVolume(e);
	  };
	  const thumbUp = (e) => {
	      APlayerController.volumeBarWrap.classList.remove('aplayer-volume-bar-wrap-active');
	      document.removeEventListener('mouseup', thumbUp);
	      document.removeEventListener('mousemove', thumbMove);
	      updateAPlayerVolume(e);
	  };

	  APlayerController.volumeBarWrap.addEventListener('mousedown', () => {
	      APlayerController.volumeBarWrap.classList.add('aplayer-volume-bar-wrap-active');
	      document.addEventListener('mousemove', thumbMove);
	      document.addEventListener('mouseup', thumbUp);
	  });


		// 设置完监听就立即更新一次
		updateAPlayerControllerStatus();
		onUpdateAPlayerVolume();
		APlayerController.observer = true;
		console.log('APlayerController ready!');

	} catch (error) {
		delete APlayerController.observer;
	}
}

// 更新控制器状态
function updateAPlayerControllerStatus() {
	try {
		if (APlayerController.player.audio.paused) {
			document.getElementsByClassName('nav toggle')[0].children[0].classList.add("fa-play");
			document.getElementsByClassName('nav toggle')[0].children[0].classList.remove("fa-pause");
		} else {
			document.getElementsByClassName('nav toggle')[0].children[0].classList.remove("fa-play");
			document.getElementsByClassName('nav toggle')[0].children[0].classList.add("fa-pause");
		}
	} catch (error) {
		console.log(error);
	}
}
function onUpdateAPlayerVolume() {
	try {
		APlayerController.volumeBar.children[0].style.width = APlayerController.player.audio.volume * 100 + '%'
	} catch (error) {
		console.log(error);
	}
}

// 播放/暂停
function aplayerToggle() {
	checkAPlayer();
	try {
		APlayerController.player.toggle();
	} catch (error) {
		console.log(error);
	}
}

// 上一曲
function aplayerBackward() {
	checkAPlayer();
	try {
		APlayerController.player.skipBack();
		APlayerController.player.play();
	} catch (error) {
		console.log(error);
	}
}

// 下一曲
function aplayerForward() {
	checkAPlayer();
	try {
		APlayerController.player.skipForward();
		APlayerController.player.play();
	} catch (error) {
		console.log(error);
	}
}

// 调节音量
function aplayerVolume(percent) {
	checkAPlayer();
	try {
		APlayerController.player.volume(percent);
	} catch (error) {
		console.log(error);
	}
}

// 更新音乐标题
function updateTitle() {
	checkAPlayer();
	try {
		let index = APlayerController.player.list.index;
		let obj = APlayerController.player.list.audios[index];
		document.getElementsByClassName('nav music-title')[0].innerHTML = obj.title;
	} catch (error) {
		console.log(error);
	}
}

(function ($) {
	// 网速快
	checkAPlayer();
	// 网速一般
	setTimeout(function(){
		checkAPlayer();
	}, 3000);
	// 网速较慢
	setTimeout(function(){
		checkAPlayer();
	}, 10000);


})(jQuery);

function setData() {
	checkAPlayer();
  //不断循环记录播放进度
  setInterval(function () {
      //检测是否支持本地存储
      if (typeof (Storage) !== 'undefined') {
		  try {
			  //把播放进度等数据存入sessionStorage存储中
			  window.sessionStorage.setItem('playStatus', APlayerController.player.audio.paused);
			  window.sessionStorage.setItem('currentTime', APlayerController.player.audio.currentTime);
			  window.sessionStorage.setItem('musicIndex', APlayerController.player.list.index);
			  window.sessionStorage.setItem('mode', APlayerController.player.mode);
			  window.sessionStorage.setItem('list', APlayerController.player.template.list.classList.contains("aplayer-list-hide"));
			  window.sessionStorage.setItem('lrc', APlayerController.player.template.lrcButton.classList.contains("aplayer-icon-lrc-inactivity"));
		  }catch (error) {
			  console.log(error);
		  }
      }
  }, 100);
}