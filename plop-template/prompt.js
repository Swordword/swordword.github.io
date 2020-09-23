Date.prototype.Format = function (fmt) { 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "H+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
const nowTime = new Date().Format("yyyy-MM-dd HH:mm:ss");
console.log('nowTime', nowTime)
module.exports = {
  description: "generate new blog",
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'blog title please'
    }
  ],
  actions: data => {
    const name = '{{name}}'
    const actions = [
      {
        type: 'add',
        path: `posts/${name}.md`,
        templateFile: 'plop-template/plop-blog.hbs',
        data: {
          name: name,
          date: nowTime
        }
      }
    ]
    return actions
  }

}