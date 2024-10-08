# Generated by Django 4.2.15 on 2024-08-22 13:13

import django.contrib.auth.models
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='OtpValidator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('channel_type', models.CharField(choices=[('EMAIL', 'EMAIL'), ('SMS', 'SMS')], db_index=True, default='EMAIL', max_length=50)),
                ('email_or_mobile', models.CharField(max_length=255)),
                ('otp', models.CharField(max_length=20)),
                ('temp_token', models.CharField(max_length=255, unique=True)),
                ('status', models.BooleanField(default=True)),
                ('verification_status', models.CharField(choices=[('VERIFIED', 'VERIFIED'), ('PENDING', 'PENDING'), ('EXPIRED', 'EXPIRED')], db_index=True, max_length=50)),
                ('verified_at', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('expiry', models.DateTimeField()),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'otp_validator',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('mobile_number', models.CharField(blank=True, max_length=15, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('username', models.CharField(blank=True, max_length=255, unique=True)),
                ('designation', models.CharField(blank=True, max_length=255, unique=True)),
                ('experience', models.FloatField(blank=True, null=True)),
                ('role', models.CharField(blank=True, choices=[('Admin', 'Admin'), ('Member', 'Member')], max_length=10, null=True)),
                ('email_verified', models.BooleanField(default=False)),
                ('mobile_verified', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('meta_data', models.JSONField(blank=True, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'db_table': 'user',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
