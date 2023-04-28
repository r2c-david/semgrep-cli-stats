
const DATA = require('./output-cli-scan.json');

function fmat_finding(f) {
    return {
        rule: f.check_id,
        path: f.path
    }
}

function aggregate_data(data) {

    let data_aggregated = data.results.reduce((aggregate, finding) => {
        let ff = fmat_finding(finding);
        
        if (aggregate.hasOwnProperty(ff.rule)) {
            aggregate[ff.rule].push(ff.path);
            return aggregate;
        } else {
            aggregate[ff.rule] = [ff.path];
            return aggregate;
        }

    }, {});

    return data_aggregated;
}
    

function aggregate_stats(data) {
    let stats = [];

    for ([key, value] of Object.entries(aggregate_data(data))) {
        stats.push({rule: key, matches: value.length})
    }

    return stats.sort((a,b) => (a.matches < b.matches) ? 1 : -1);
}

aggregate_stats(DATA).forEach(d => console.log(`${d.matches} files matched by ${d.rule}`))