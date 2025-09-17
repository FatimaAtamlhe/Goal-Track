from django.urls import path

from . import views

app_name = "tracker"

urlpatterns = [
	path("", views.home_view, name="home"),
	path("register/", views.register_view, name="register"),
	path("login/", views.login_view, name="login"),
	path("logout/", views.logout_view, name="logout"),
	path("dashboard/", views.dashboard_view, name="dashboard"),

	# Habits
	path("habits/", views.habit_list, name="habit_list"),
	path("habits/add/", views.habit_create, name="habit_create"),
	path("habits/<int:pk>/edit/", views.habit_edit, name="habit_edit"),
	path("habits/<int:pk>/delete/", views.habit_delete, name="habit_delete"),
	path("habits/<int:pk>/progress/", views.habit_progress_list, name="habit_progress_list"),
	path("habits/<int:pk>/progress/add/", views.habit_progress_add, name="habit_progress_add"),

	# Goals
	path("goals/", views.goal_list, name="goal_list"),
	path("goals/add/", views.goal_create, name="goal_create"),
	path("goals/<int:pk>/edit/", views.goal_edit, name="goal_edit"),
	path("goals/<int:pk>/delete/", views.goal_delete, name="goal_delete"),
]

