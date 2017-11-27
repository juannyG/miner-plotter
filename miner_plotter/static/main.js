(function() {

    function _getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function _dateDisplay(ts) {
        var d = new Date(ts);
        return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " + d.toLocaleTimeString();
    }

    function _extractData(data) {
        return data.map(function(a) { return a[1]; });
    }

    function _plotData(canvasId, points) {
        var firstPointSet = points[Object.keys(points)[0]];
        var dataLabels = firstPointSet.map(function(a) { return _dateDisplay(a[0]); });
        var datasets = [];
        for (var k in points) {
            if (points.hasOwnProperty(k)) {
                datasets.push({
                    label: k,
                    fill: false,
                    borderColor: _getRandomColor(),
                    lineTension: 0.1,
                    data: _extractData(points[k])
                });
            }
        }

        chart = new Chart(
            $("#"+canvasId), {
                type: "line",
                data: {
                    labels: dataLabels,
                    datasets: datasets,
                },
                options: {
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        borderWidth: 1
                    }
                }
            }
        );
    }

    function success_fn(data) {
        var canvasId = "canvas-" + data.slug;

        var tmpl = $("#graph-template").html();
        tmpl = tmpl.replace("{{graphId}}", "graph-" + data.slug);
        tmpl = tmpl.replace("{{graphCanvasId}}", canvasId);
        tmpl = tmpl.replace("{{graphTitle}}", data.plot_title);
        $(".uk-container").append(tmpl);

        _plotData(canvasId, data.points);
    }

    $(document).ready(function(){
        var devices = [
            "odroid-xu4",
            "dell-inspiron-desktop", 
            "intel-s1400sp-xeon-e5-2450l",
            "supermicro-x8dtu-f-dual-xeon-e5649"
        ];

        for (var i=0; i < devices.length; ++i) {
            $.get("http://ec2-34-229-148-32.compute-1.amazonaws.com/plot/"+ devices[i], success_fn);
        }
    });
})();

