from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from datetime import date

from .forms import GoalForm, HabitForm, LoginForm, RegistrationForm, HabitProgressForm
from .models import Goal, Habit


def home_view(request: HttpRequest) -> HttpResponse:
	"""Main landing page with login/register forms and dashboard if logged in"""
	if request.user.is_authenticated:
		# User is logged in - show dashboard with all data
		habits = Habit.objects.filter(user=request.user)
		goals = Goal.objects.filter(user=request.user)
		
		# Build progress summary for habits
		progress_summary = []
		for habit in habits:
			entries = habit.progress_entries.all()
			total = entries.count()
			completed = entries.filter(status=True).count()
			pct = int((completed / total) * 100) if total else 0
			progress_summary.append({
				"habit": habit,
				"completed": completed,
				"total": total,
				"percent": pct,
			})
		
		return render(request, "tracker/home.html", {
			"username": request.user.username,
			"habits": habits,
			"goals": goals,
			"progress_summary": progress_summary
		})
	else:
		# User not logged in - show login/register forms
		login_form = LoginForm(request)
		register_form = RegistrationForm()
		
		if request.method == "POST":
			if "login" in request.POST:
				login_form = LoginForm(request, data=request.POST)
				if login_form.is_valid():
					user = login_form.get_user()
					login(request, user)
					messages.success(request, "Welcome back!")
					return redirect("tracker:home")
			elif "register" in request.POST:
				register_form = RegistrationForm(request.POST)
				if register_form.is_valid():
					user = register_form.save()
					messages.success(request, "Account created successfully!")
					return redirect("tracker:home")
		
		return render(request, "tracker/home.html", {
			"login_form": login_form,
			"register_form": register_form
		})


def register_view(request: HttpRequest) -> HttpResponse:
	if request.method == "POST":
		form = RegistrationForm(request.POST)
		if form.is_valid():
			user = form.save()
			messages.success(request, "Account created successfully. Please log in.")
			return redirect("tracker:login")
	else:
		form = RegistrationForm()
	return render(request, "tracker/register.html", {"form": form})


def login_view(request: HttpRequest) -> HttpResponse:
	if request.method == "POST":
		form = LoginForm(request, data=request.POST)
		if form.is_valid():
			user = form.get_user()
			login(request, user)
			return redirect("tracker:dashboard")
	else:
		form = LoginForm(request)
	return render(request, "tracker/login.html", {"form": form})


def logout_view(request: HttpRequest) -> HttpResponse:
	logout(request)
	return redirect("tracker:home")


@login_required
def dashboard_view(request: HttpRequest) -> HttpResponse:
	# Build simple completion summary per habit (percentage of days completed)
	habits = Habit.objects.filter(user=request.user)
	progress_summary = []
	for habit in habits:
		entries = habit.progress_entries.all()
		total = entries.count()
		completed = entries.filter(status=True).count()
		pct = int((completed / total) * 100) if total else 0
		progress_summary.append({
			"habit": habit,
			"completed": completed,
			"total": total,
			"percent": pct,
		})
	return render(request, "tracker/dashboard.html", {"username": request.user.username, "progress_summary": progress_summary})


# Habit CRUD
@login_required
def habit_list(request: HttpRequest) -> HttpResponse:
	habits = Habit.objects.filter(user=request.user).order_by("-created_at")
	return render(request, "tracker/habits/habit_list.html", {"habits": habits})


@login_required
def habit_create(request: HttpRequest) -> HttpResponse:
	if request.method == "POST":
		form = HabitForm(request.POST)
		if form.is_valid():
			habit: Habit = form.save(commit=False)
			habit.user = request.user
			habit.save()
			messages.success(request, "Habit created.")
			return redirect("tracker:habit_list")
	else:
		form = HabitForm()
	return render(request, "tracker/habits/habit_create.html", {"form": form})


@login_required
def habit_edit(request: HttpRequest, pk: int) -> HttpResponse:
	habit = get_object_or_404(Habit, pk=pk, user=request.user)
	if request.method == "POST":
		form = HabitForm(request.POST, instance=habit)
		if form.is_valid():
			form.save()
			messages.success(request, "Habit updated.")
			return redirect("tracker:habit_list")
	else:
		form = HabitForm(instance=habit)
	return render(request, "tracker/habits/habit_edit.html", {"form": form, "habit": habit})


@login_required
def habit_delete(request: HttpRequest, pk: int) -> HttpResponse:
	habit = get_object_or_404(Habit, pk=pk, user=request.user)
	if request.method == "POST":
		habit.delete()
		messages.success(request, "Habit deleted.")
		return redirect("tracker:habit_list")
	return render(request, "tracker/habits/habit_delete.html", {"habit": habit})


# Goal CRUD
@login_required
def goal_list(request: HttpRequest) -> HttpResponse:
	goals = Goal.objects.filter(user=request.user).order_by("-target_date")
	return render(request, "tracker/goals/goal_list.html", {"goals": goals})


# Habit Progress
@login_required
def habit_progress_list(request: HttpRequest, pk: int) -> HttpResponse:
	habit = get_object_or_404(Habit, pk=pk, user=request.user)
	entries = habit.progress_entries.order_by("-date")
	return render(request, "tracker/habits/habit_progress_list.html", {"habit": habit, "entries": entries})


@login_required
def habit_progress_add(request: HttpRequest, pk: int) -> HttpResponse:
	habit = get_object_or_404(Habit, pk=pk, user=request.user)
	if request.method == "POST":
		form = HabitProgressForm(request.POST)
		if form.is_valid():
			progress = form.save(commit=False)
			progress.habit = habit
			progress.save()
			messages.success(request, "Progress saved.")
			return redirect("tracker:habit_progress_list", pk=habit.pk)
	else:
		form = HabitProgressForm(initial={"date": date.today(), "status": True})
	return render(request, "tracker/habits/habit_progress_add.html", {"habit": habit, "form": form})


@login_required
def goal_create(request: HttpRequest) -> HttpResponse:
	if request.method == "POST":
		form = GoalForm(request.POST)
		if form.is_valid():
			goal: Goal = form.save(commit=False)
			goal.user = request.user
			goal.save()
			messages.success(request, "Goal created.")
			return redirect("tracker:goal_list")
	else:
		form = GoalForm()
	return render(request, "tracker/goals/goal_create.html", {"form": form})


@login_required
def goal_edit(request: HttpRequest, pk: int) -> HttpResponse:
	goal = get_object_or_404(Goal, pk=pk, user=request.user)
	if request.method == "POST":
		form = GoalForm(request.POST, instance=goal)
		if form.is_valid():
			form.save()
			messages.success(request, "Goal updated.")
			return redirect("tracker:goal_list")
	else:
		form = GoalForm(instance=goal)
	return render(request, "tracker/goals/goal_edit.html", {"form": form, "goal": goal})


@login_required
def goal_delete(request: HttpRequest, pk: int) -> HttpResponse:
	goal = get_object_or_404(Goal, pk=pk, user=request.user)
	if request.method == "POST":
		goal.delete()
		messages.success(request, "Goal deleted.")
		return redirect("tracker:goal_list")
	return render(request, "tracker/goals/goal_delete.html", {"goal": goal})