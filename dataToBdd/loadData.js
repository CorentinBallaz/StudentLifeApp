const {spawn} = require('child_process');
var cron = require('node-cron');


exports.injectBDD = ()=>{
    const pythonEvent = spawn('python3', ['./dataToBdd/jsonReader.py']);
    pythonEvent.stdout.on('data', function (data) {
        console.log('Pipe dataToBdd from python script ...');
        dataToSend = data.toString();
        console.log(dataToSend);
    });

    pythonEvent.stderr.on('data', function (data) {
        console.log(data.toString());
    });

    const injectAdeEventfirst  =spawn('python3', ['./dataToBdd/buildAdeEventsAndAddToDb.py']);
    injectAdeEventfirst.stdout.on('data', function (data) {
        console.log('Pipe dataToBdd from python script ...');
        dataToSend = data.toString();
        console.log(dataToSend);
    });

    injectAdeEventfirst.stderr.on('data', function (data) {
        console.log(data.toString());
    });

    const injectEadEventfirst = spawn('python3', ['./dataToBdd/buildEadEventsAndAddToDb.py']);
    injectEadEventfirst.stdout.on('data', function (data) {
        console.log('Pipe dataToBdd from python script ...');
        dataToSend = data.toString();
        console.log(dataToSend);
    });
    injectEadEventfirst.stderr.on('data', function (data) {
        console.log(data.toString());
    });

    cron.schedule('00 00 00 * * *',function () {
        const injectAdeEvent  =spawn('python3', ['./dataToBdd/buildAdeEventsAndAddToDb.py']);
        injectAdeEvent.stdout.on('data', function (data) {
            console.log('Pipe dataToBdd from python script ...');
            dataToSend = data.toString();
            console.log(dataToSend);
        });

        injectAdeEvent.stderr.on('data', function (data) {
            console.log(data.toString());
        });

        const injectEadEvent = spawn('python3', ['./dataToBdd/buildEadEventsAndAddToDb.py']);
        injectEadEvent.stdout.on('data', function (data) {
            console.log('Pipe dataToBdd from python script ...');
            dataToSend = data.toString();
            console.log(dataToSend);
        });

        injectEadEvent.stderr.on('data', function (data) {
            console.log(data.toString());
        });

    })


};
