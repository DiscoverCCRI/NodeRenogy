const fs = require('fs');

module.exports = {
    writeToJSON: async function (data, subTopic) {
        try {
            // define vars
            let jsonData = [];
            let dataDir = './data/noderenogy/';

            // current timestamp in milliseconds
            let ts = Date.now();

            let date_time = new Date(ts);
            let date = ("0" + (date_time.getDate()));
            let month = ("0" + (date_time.getMonth() + 1));
            let year = date_time.getFullYear();

            let fileName = dataDir + 'noderenogy-' + subTopic + '-' + year + month + date + '.json';

            // See if directory exists
            if (fs.existsSync(dataDir)) {

                // Check if file exists
                if (!fs.existsSync(fileName)) {
                    // create new file if it doesn't exist
                    fs.closeSync(fs.openSync(fileName, 'w'));
                }

                // read file
                const file = fs.readFileSync(fileName);

                // Check if file is empty
                if (file.length == 0) {
                    // Add data to JSON file
                    jsonData.push(data);
                    fs.writeFileSync(fileName, JSON.stringify(jsonData));
                } 
                
                else {
                    // Append data to JSON file
                    jsonData = JSON.parse(file);

                    // Add element to JSON object
                    jsonData.push(data);
                    fs.writeFileSync(fileName, JSON.stringify(jsonData));
                }
            }

            else {
                console.log("Data directory not found!");
                console.log("Creating " + dataDir);

                // Create the data directory and restart the function.
                fs.mkdirSync(dataDir, {recursive: true});
                this.writeToJSON(data, subTopic);
            }

        } catch (e){
            // Replace this with logger.error(e);
            console.log(e);
        }
    }
}