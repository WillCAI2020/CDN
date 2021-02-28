const ap = new APlayer({
    container: document.getElementById('aplayer'),
	fixed: true,
	autoplay: true,
	lrcType: 3,
    audio: [
		{
			name: '慵懒的猫',
			artist: 'Hea2t',
			url: 'https://cdn.jsdelivr.net/gh/WillCAI2020/cdn/music/慵懒的猫.mp3',
			cover: 'http://p1.music.126.net/89f0ghqzPenQCwwxki4_fw==/109951164594173915.jpg?param=130y130',
			lrc: 'https://cdn.jsdelivr.net/gh/WillCAI2020/cdn@1.2.1/music/Hea2t.lrc'
		},
		{
			name: '飞鸟与蝉',
			artist: '可可',
			url: 'https://willcai2020.gitee.io/files/music/%E9%A3%9E%E9%B8%9F%E4%B8%8E%E8%9D%89.mp3',
			cover: 'http://p2.music.126.net/4pTCC_lBDmoiti8lxOu8_Q==/109951165277363176.jpg?param=130y130',
			lrc: 'https://cdn.jsdelivr.net/gh/WillCAI2020/cdn@1.2.1/music/飞鸟和蝉-可可.lrc'
		}
	]
});