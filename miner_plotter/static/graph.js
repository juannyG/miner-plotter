var options, graph_data, chart, data_src;

function success_fn(data, textStatus, jqXHR) {
    graph_data = [];

    for (label in data) {
        graph_data.push({
            data: data[label],
            label: label,
            lines: {show: true}
         });
    }

    options = {
         legend:{
             position: "nw",
             sorted: "ascending"
         },
         xaxis: {mode: "time", timeformat: "%I:%M:%S"}
    };
    chart = $.plot($("#placeholder"), graph_data, options);
}

$(document).ready(function(){
    $.get("http://ec2-34-229-148-32.compute-1.amazonaws.com/plot/odroid-xu4", success_fn);
});
