from django import forms
from .models import Users

class BookForm(forms.ModelForm):
    class Meta:
        model = Users
        fields =  ('username','password','password2','nickname')