from django.contrib import admin

from .models import Goal, Habit, HabitProgress


@admin.register(Habit)
class HabitAdmin(admin.ModelAdmin):
	list_display = ("title", "user", "frequency", "created_at")
	list_filter = ("frequency", "created_at")
	search_fields = ("title", "user__username")


@admin.register(HabitProgress)
class HabitProgressAdmin(admin.ModelAdmin):
	list_display = ("habit", "date", "status")
	list_filter = ("status", "date")
	search_fields = ("habit__title",)


@admin.register(Goal)
class GoalAdmin(admin.ModelAdmin):
	list_display = ("title", "user", "target_date", "is_completed")
	list_filter = ("is_completed", "target_date")
	search_fields = ("title", "user__username")

