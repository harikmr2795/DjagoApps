from django.db import models

class Data(models.Model):
    name = models.CharField(max_length=25, default="")
    q0 = models.CharField(max_length=3, default="")
    q1 = models.CharField(max_length=3, default="")
    q2 = models.CharField(max_length=3, default="")
    q3 = models.CharField(max_length=3, default="")
    q4 = models.CharField(max_length=3, default="")
    q5 = models.CharField(max_length=3, default="")
    q6 = models.CharField(max_length=3, default="")
    q7 = models.CharField(max_length=3, default="")
    q8 = models.CharField(max_length=3, default="")
    q9 = models.CharField(max_length=3, default="")
    a0 = models.CharField(max_length=1, default="")
    a1 = models.CharField(max_length=1, default="")
    a2 = models.CharField(max_length=1, default="")
    a3 = models.CharField(max_length=1, default="")
    a4 = models.CharField(max_length=1, default="")
    a5 = models.CharField(max_length=1, default="")
    a6 = models.CharField(max_length=1, default="")
    a7 = models.CharField(max_length=1, default="")
    a8 = models.CharField(max_length=1, default="")
    a9 = models.CharField(max_length=1, default="")

    def __str__(self):
        return self.name

class Score(models.Model):
    data = models.ForeignKey(Data, on_delete="models.CASCADE")
    name = models.CharField(max_length=25)
    score = models.CharField(max_length=2)