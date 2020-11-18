jsDelivr 规则：
// load any GitHub release, commit, or branch

// note: we recommend using npm for projects that support it

https://cdn.jsdelivr.net/gh/user/repo@version/file


// load jQuery v3.2.1

https://cdn.jsdelivr.net/gh/jquery/jquery@3.2.1/dist/jquery.min.js


// use a version range instead of a specific version

https://cdn.jsdelivr.net/gh/jquery/jquery@3.2/dist/jquery.min.js

https://cdn.jsdelivr.net/gh/jquery/jquery@3/dist/jquery.min.js


// omit the version completely to get the latest one

// you should NOT use this in production

https://cdn.jsdelivr.net/gh/jquery/jquery/dist/jquery.min.js


// add ".min" to any JS/CSS file to get a minified version

// if one doesn't exist, we'll generate it for you

https://cdn.jsdelivr.net/gh/jquery/jquery@3.2.1/src/core.min.js


// add / at the end to get a directory listing

https://cdn.jsdelivr.net/gh/jquery/jquery/


https://cdn.jsdelivr.net/gh/用户名/仓库名@版本号/文件路径
若无版本号，‘@v1.0’ 删除
例：https://cdn.jsdelivr.net/gh/WillCAI2020/cdn/css/homework_one/homework_one.css