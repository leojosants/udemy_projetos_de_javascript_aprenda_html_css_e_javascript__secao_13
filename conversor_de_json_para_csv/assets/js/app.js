/* */
const converter_form = document.querySelector('#converter_form');
const converter_input = document.querySelector('#converter_input');
const json_to_csv_button = document.querySelector('#json_to_csv_button');
const csv_to_json_button = document.querySelector('#csv_to_json_button');

/* */
function jsonToCSV(json) {
    const headers = Object.keys(json[0]);
    const csv_rows = [];

    csv_rows.push(headers.join(','));

    for (const row of json) {
        const values = headers.map((header) => {
            let value = row[header];

            if (value === null || value === undefined) {
                value = '';
            }
            else if (typeof value === 'object') {
                value = JSON.stringify(value);
            };

            return value;
        });

        csv_rows.push(values.join(','));
    };

    return csv_rows.join('\n');
};

/* */
function csvToJSON(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const json = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const row = {};

        for (let j = 0; j < headers.length; j++) {
            let value = values[j];

            if (value[0] === '{' || value[0] === '[') {
                value = JSON.parse(value);
            };

            row[headers[j]] = value;
        };

        json.push(row);
    };

    console.log(json);
};

/* */
function downloadCSV(csv) {
    const download_link = document.createElement('a');
    download_link.setAttribute('href', 'data:text/csv;charset-utf-8,' + encodeURIComponent(csv));
    download_link.setAttribute('download', 'data.csv');
    download_link.style.display = 'none';

    document.body.appendChild(download_link);
    download_link.click();
    document.body.removeChild(download_link);
};

/* */
json_to_csv_button.addEventListener('click', function () {
    const json = JSON.parse(converter_input.value.trim());
    const csv = jsonToCSV(json);
    downloadCSV(csv);
});

/* */
csv_to_json_button.addEventListener('click', function () {
    const csv = converter_input.value.trim();
    const json = csvToJSON(csv);
});