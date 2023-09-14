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
json_to_csv_button.addEventListener('click', function () {
    const json = JSON.parse(converter_input.value.trim());
    const csv = jsonToCSV(json);
    console.log(csv);
});