from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from .models import Goal, Habit, HabitProgress


class RegistrationForm(forms.ModelForm):
	password = forms.CharField(label="Password", widget=forms.PasswordInput)
	password_confirm = forms.CharField(label="Confirm Password", widget=forms.PasswordInput)

	class Meta:
		model = User
		fields = ["username", "email", "password"]
		widgets = {"email": forms.EmailInput()}

	def clean(self):
		cleaned = super().clean()
		password = cleaned.get("password")
		password_confirm = cleaned.get("password_confirm")
		if password and password_confirm and password != password_confirm:
			raise forms.ValidationError("Passwords do not match.")
		return cleaned

	def save(self, commit: bool = True) -> User:
		user: User = super().save(commit=False)
		user.set_password(self.cleaned_data["password"])  # secure hashing
		if commit:
			user.save()
		return user


class LoginForm(AuthenticationForm):
	username = forms.CharField(label="Username")
	password = forms.CharField(label="Password", widget=forms.PasswordInput)


class HabitForm(forms.ModelForm):
	class Meta:
		model = Habit
		fields = ["title", "description", "frequency"]


class GoalForm(forms.ModelForm):
	class Meta:
		model = Goal
		fields = ["title", "description", "target_date", "is_completed", "progress_percentage", "progress_notes"]
		widgets = {
			"progress_notes": forms.Textarea(attrs={"rows": 3, "placeholder": "اكتب التقدم المحقق نحو هدفك..."}),
			"progress_percentage": forms.NumberInput(attrs={"min": 0, "max": 100, "step": 1}),
		}


class HabitProgressForm(forms.ModelForm):
	class Meta:
		model = HabitProgress
		fields = ["date", "status"]

