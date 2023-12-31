/* */
const converter_form = document.querySelector('#converter_form');
const converter_input = document.querySelector('#converter_input');
const json_to_csv_button = document.querySelector('#json_to_csv_button');
const csv_to_json_button = document.querySelector('#csv_to_json_button');

/* */
function converterJSONtoCSV(json) {
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
function converterCSVtoJSON(csv) {
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

    return json;
};

/* */
function displayJSON(json) {
    const result_area = document.createElement('pre');
    result_area.classList.add('result_area');
    result_area.textContent = JSON.stringify(json, null, 2);

    document.body.appendChild(result_area);

    const copy_button = document.createElement('button');
    copy_button.classList.add('copy_json');
    copy_button.innerText = 'copiar';
    document.body.appendChild(copy_button);

    copyJSON();
};

/* */
function copyJSON() {
    const result = document.querySelector('.result_area');
    const copy_json = document.querySelector('.copy_json');
    const json = result.innerText;

    copy_json.addEventListener('click', function () {
        navigator.clipboard.writeText(json)
            .then(() => {
                alert('JSON copiado para a área de transferência.');
            },
                (err) => {
                    console.log('Erro ao copiar JSON.');
                }
            );
    });
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
    const csv = converterJSONtoCSV(json);
    downloadCSV(csv);
});

/* */
csv_to_json_button.addEventListener('click', function () {
    const csv = converter_input.value.trim();
    const json = converterCSVtoJSON(csv);
    displayJSON(json);
});