import slugify
import json

from functools import wraps
from flask import request
from flask_restful import Resource, Api
from application import app
from models import DevicePlot, PlotPoints

api = Api(app)


def prime_device_plot(f):
    @wraps(f)
    def dec_f(*args, **kwargs):
        device_slug = kwargs.get('device_slug')
        try:
	    device_plot = DevicePlot.objects.get({'slug': slugify.slugify(device_slug)})
	except DevicePlot.DoesNotExist:
	    return {"detail": "A plot for device {} was not found".format(device_slug)}, 404
	kwargs['device_plot'] = device_plot
        return f(*args, **kwargs)
    return dec_f


class PlotViews(Resource):

    @prime_device_plot
    def get(self, device_plot=None, *args, **kwargs):
        points = PlotPoints.objects.raw({"device_plot": device_plot.pk})
	return {point.label: point.points for point in points}

    @prime_device_plot
    def post(self, device_plot=None, *args, **kwargs):
	for label, point in request.json.items():
	    try:
	        plot_points = PlotPoints.objects.get({"device_plot": device_plot.pk, "label": label})
	    except PlotPoints.DoesNotExist:
	        plot_points = PlotPoints(device_plot=device_plot, label=label)
            plot_points.points += point
	    plot_points.save()
        return '', 201


@app.route('/')
def hello_world():
    return 'Hello, World!'

api.add_resource(PlotViews, "/plot/<string:device_slug>")
