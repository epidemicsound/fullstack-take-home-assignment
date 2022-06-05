from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_fetch_data'),
    ]

    operations = [
        migrations.CreateModel(
            name='Playlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('tracks', models.ManyToManyField(related_name='track', to='api.Track')),
            ],
        ),
    ]
