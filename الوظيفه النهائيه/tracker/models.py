from django.conf import settings
from django.db import models


class Habit(models.Model):
	FREQUENCY_DAILY = "daily"
	FREQUENCY_WEEKLY = "weekly"
	FREQUENCY_MONTHLY = "monthly"

	FREQUENCY_CHOICES = [
		(FREQUENCY_DAILY, "Daily"),
		(FREQUENCY_WEEKLY, "Weekly"),
		(FREQUENCY_MONTHLY, "Monthly"),
	]

	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="habits")
	title = models.CharField(max_length=255)
	description = models.TextField(blank=True)
	frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self) -> str:  # pragma: no cover - simple representation
		return f"{self.title} ({self.user})"


class HabitProgress(models.Model):
	habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name="progress_entries")
	date = models.DateField()
	status = models.BooleanField(default=False)

	class Meta:
		unique_together = ("habit", "date")

	def __str__(self) -> str:  # pragma: no cover
		return f"{self.habit.title} on {self.date}: {'Done' if self.status else 'Pending'}"


class Goal(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="goals")
	title = models.CharField(max_length=255)
	description = models.TextField(blank=True)
	target_date = models.DateField()
	is_completed = models.BooleanField(default=False)
	progress_notes = models.TextField(blank=True, help_text="تسجيل التقدم المحقق نحو الهدف")
	progress_percentage = models.PositiveIntegerField(default=0, help_text="نسبة التقدم (0-100%)")

	def __str__(self) -> str:  # pragma: no cover
		return f"{self.title} ({'Completed' if self.is_completed else 'Active'}) - {self.progress_percentage}%"

