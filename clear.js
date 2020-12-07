var fs = require('fs');

fs.unlink('log.txt', function(err) {
    if (err) {
        console.log('Нет ни одной игры');
    } else {
        console.log('Файл успешно очищен');
    }
});