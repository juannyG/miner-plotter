import pymodm
import slugify


class DevicePlot(pymodm.MongoModel):
    device_name = pymodm.fields.CharField()
    slug = pymodm.fields.CharField()
    plot_title = pymodm.fields.CharField()
    x_label = pymodm.fields.CharField()
    y_label = pymodm.fields.CharField()

    def save(self, *args, **kwargs):
        if not self.pk:
            self.slug = slugify.slugify(self.device_name)
        super(DevicePlot, self).save(*args, **kwargs)


class PlotPoints(pymodm.MongoModel):
    device_plot = pymodm.fields.ReferenceField(DevicePlot)
    label = pymodm.fields.CharField()
    points = pymodm.fields.ListField()
