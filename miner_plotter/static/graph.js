function build_graph_elements(data, dom_id) {
    var container, title, elm;
    container = $("<div></div>");
    container.addClass("main_col");

    title = $("<div>" + data.plot_title + "<br/>" + "(" + data.device_name + ")</div>");
    title.addClass("graph_title");

    elm = $('<div></div>');
    elm.attr('id', dom_id);
    elm.addClass("device_graph");

    container.append(title);
    container.append(elm);
    return container;
}

function build_graph_data(data) {
    var graph_data = [];
    for (label in data.points) {
        graph_data.push({
            data: data.points[label],
            label: label,
            lines: {show: true}
         });
    }
    return graph_data;
}

function build_graph_options(data) {
    return {
         legend:{
             position: "nw",
             sorted: "ascending"
         },
         xaxis: {mode: "time", timeformat: "%I:%M:%S"}
    };
}

function success_fn(data, textStatus, jqXHR) {
    var graph_options, graph_data, graph_elm, graph_dom_id;

    graph_dom_id = data.slug + "-graph";
    graph_elm = build_graph_elements(data, graph_dom_id);
    graph_data = build_graph_data(data);
    graph_options = build_graph_options(data);

    $("body").append(graph_elm);
    $.plot($("#" + graph_dom_id), graph_data, graph_options);
}

$(document).ready(function(){
    var devices = ["odroid-xu4"];
    for (var i=0; i < devices.length; ++i) {
        $.get("http://ec2-34-229-148-32.compute-1.amazonaws.com/plot/"+ devices[i], success_fn);
    }
});
