var fs = require('fs');
var moment = require('moment');
var currentDir = process.cwd();
var blogFile = currentDir + '/data/blog.json';

module.exports = {
    getAuthorInfo: function () {

    },
    // 获取列表数据
    get: function *(next, id) {
        var data = fs.readFileSync(blogFile, 'utf8');
        this.body = data;
    },
    // 添加一条
    post: function*(next) { 
        var data = fs.readFileSync(blogFile, 'utf8');
        data = JSON.parse(data);
        var insertData = this.request.body;  
        console.log('insertData', insertData);
        var items = data.items;
        insertData.date = moment().format("YYYY-MM-DD HH:mm:ss");
        items.push(insertData);
        data.items = items.reverse();
        data.total = data.items.length;

        fs.writeFile(blogFile, JSON.stringify(data), function (err) {
            if (err) throw err;
            console.log("Add Success");
        });
        this.body = "success.";
    }
};