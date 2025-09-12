// HabitTracker Application
class HabitTracker {
    constructor() {
        this.habits = JSON.parse(localStorage.getItem('habits')) || [];
        this.goals = JSON.parse(localStorage.getItem('goals')) || [];
        this.completions = JSON.parse(localStorage.getItem('completions')) || {};
        this.goalProgress = JSON.parse(localStorage.getItem('goalProgress')) || {};
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderDashboard();
        this.renderHabits();
        this.renderGoals();
        this.initCharts();
        this.loadSampleData();
    }

    setupEventListeners() {
        // Habit form submission
        document.getElementById('habitForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addHabit();
        });

        // Goal modal
        const addGoalBtn = document.getElementById('addGoalBtn');
        const goalModal = document.getElementById('goalModal');
        const closeBtn = document.querySelector('.close');
        const cancelBtn = document.getElementById('cancelGoal');

        addGoalBtn.addEventListener('click', () => {
            goalModal.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            goalModal.style.display = 'none';
        });

        cancelBtn.addEventListener('click', () => {
            goalModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === goalModal) {
                goalModal.style.display = 'none';
            }
        });

        // Goal form submission
        document.getElementById('goalForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addGoal();
        });

        // Filter controls
        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.renderHabits();
        });

        document.getElementById('statusFilter').addEventListener('change', () => {
            this.renderHabits();
        });
    }

    addHabit() {
        const formData = new FormData(document.getElementById('habitForm'));
        const habit = {
            id: Date.now().toString(),
            name: document.getElementById('habitName').value,
            description: document.getElementById('habitDescription').value,
            category: document.getElementById('habitCategory').value,
            frequency: document.getElementById('habitFrequency').value,
            goal: parseInt(document.getElementById('habitGoal').value),
            color: document.getElementById('habitColor').value,
            createdAt: new Date().toISOString(),
            completed: 0,
            streak: 0,
            lastCompleted: null
        };

        this.habits.push(habit);
        this.saveData();
        this.renderDashboard();
        this.renderHabits();
        this.initCharts();
        this.showMessage('Habit added successfully!', 'success');
        
        // Reset form
        document.getElementById('habitForm').reset();
        document.getElementById('habitColor').value = '#4CAF50';
    }

    addGoal() {
        const goal = {
            id: Date.now().toString(),
            title: document.getElementById('goalTitle').value,
            description: document.getElementById('goalDescription').value,
            target: parseInt(document.getElementById('goalTarget').value),
            unit: document.getElementById('goalUnit').value,
            deadline: document.getElementById('goalDeadline').value,
            color: document.getElementById('goalColor').value,
            createdAt: new Date().toISOString(),
            current: 0
        };

        this.goals.push(goal);
        this.goalProgress[goal.id] = 0;
        this.saveData();
        this.renderDashboard();
        this.renderGoals();
        this.showMessage('Goal added successfully!', 'success');
        
        // Close modal and reset form
        document.getElementById('goalModal').style.display = 'none';
        document.getElementById('goalForm').reset();
        document.getElementById('goalColor').value = '#2196F3';
    }

    completeHabit(habitId) {
        const habit = this.habits.find(h => h.id === habitId);
        if (!habit) return;

        const today = new Date().toDateString();
        const habitCompletions = this.completions[habitId] || [];
        
        // Check if already completed today
        if (habitCompletions.includes(today)) {
            this.showMessage('Habit already completed today!', 'info');
            return;
        }

        // Add completion
        habitCompletions.push(today);
        this.completions[habitId] = habitCompletions;
        
        // Update habit stats
        habit.completed++;
        habit.lastCompleted = new Date().toISOString();
        
        // Calculate streak
        this.calculateStreak(habit);
        
        this.saveData();
        this.renderDashboard();
        this.renderHabits();
        this.initCharts();
        this.showMessage('Habit completed! Great job!', 'success');
    }

    calculateStreak(habit) {
        const completions = this.completions[habit.id] || [];
        if (completions.length === 0) {
            habit.streak = 0;
            return;
        }

        // Sort completions by date
        const sortedCompletions = completions
            .map(date => new Date(date))
            .sort((a, b) => b - a);

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < sortedCompletions.length; i++) {
            const completionDate = sortedCompletions[i];
            completionDate.setHours(0, 0, 0, 0);

            if (i === 0) {
                // Check if the most recent completion is today or yesterday
                const diffDays = Math.floor((today - completionDate) / (1000 * 60 * 60 * 24));
                if (diffDays <= 1) {
                    streak = 1;
                } else {
                    break;
                }
            } else {
                // Check if consecutive days
                const prevDate = sortedCompletions[i - 1];
                const diffDays = Math.floor((prevDate - completionDate) / (1000 * 60 * 60 * 24));
                if (diffDays === 1) {
                    streak++;
                } else {
                    break;
                }
            }
        }

        habit.streak = streak;
    }

    updateGoalProgress(goalId, increment = 1) {
        const goal = this.goals.find(g => g.id === goalId);
        if (!goal) return;

        goal.current += increment;
        this.goalProgress[goalId] = (goal.current / goal.target) * 100;
        
        this.saveData();
        this.renderDashboard();
        this.renderGoals();
        this.showMessage('Goal progress updated!', 'success');
    }

    deleteHabit(habitId) {
        if (confirm('Are you sure you want to delete this habit?')) {
            this.habits = this.habits.filter(h => h.id !== habitId);
            delete this.completions[habitId];
            this.saveData();
            this.renderDashboard();
            this.renderHabits();
            this.initCharts();
            this.showMessage('Habit deleted successfully!', 'success');
        }
    }

    deleteGoal(goalId) {
        if (confirm('Are you sure you want to delete this goal?')) {
            this.goals = this.goals.filter(g => g.id !== goalId);
            delete this.goalProgress[goalId];
            this.saveData();
            this.renderDashboard();
            this.renderGoals();
            this.showMessage('Goal deleted successfully!', 'success');
        }
    }

    renderDashboard() {
        const totalHabits = this.habits.length;
        const completedToday = this.getCompletedToday();
        const currentStreak = this.getCurrentStreak();
        const goalProgress = this.getOverallGoalProgress();

        document.getElementById('totalHabits').textContent = totalHabits;
        document.getElementById('completedToday').textContent = completedToday;
        document.getElementById('currentStreak').textContent = currentStreak;
        document.getElementById('goalProgress').textContent = `${goalProgress}%`;
    }

    getCompletedToday() {
        const today = new Date().toDateString();
        let completed = 0;
        
        Object.values(this.completions).forEach(habitCompletions => {
            if (habitCompletions.includes(today)) {
                completed++;
            }
        });
        
        return completed;
    }

    getCurrentStreak() {
        if (this.habits.length === 0) return 0;
        
        const streaks = this.habits.map(habit => habit.streak);
        return Math.max(...streaks);
    }

    getOverallGoalProgress() {
        if (this.goals.length === 0) return 0;
        
        const totalProgress = Object.values(this.goalProgress).reduce((sum, progress) => sum + progress, 0);
        return Math.round(totalProgress / this.goals.length);
    }

    renderHabits() {
        const habitsList = document.getElementById('habitsList');
        const categoryFilter = document.getElementById('categoryFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;

        let filteredHabits = this.habits;

        // Apply category filter
        if (categoryFilter) {
            filteredHabits = filteredHabits.filter(habit => habit.category === categoryFilter);
        }

        // Apply status filter
        if (statusFilter) {
            filteredHabits = filteredHabits.filter(habit => {
                const today = new Date().toDateString();
                const habitCompletions = this.completions[habit.id] || [];
                const completedToday = habitCompletions.includes(today);
                
                switch (statusFilter) {
                    case 'completed':
                        return completedToday;
                    case 'active':
                        return !completedToday;
                    case 'overdue':
                        return !completedToday && this.isHabitOverdue(habit);
                    default:
                        return true;
                }
            });
        }

        if (filteredHabits.length === 0) {
            habitsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list"></i>
                    <h3>No habits found</h3>
                    <p>${this.habits.length === 0 ? 'Add your first habit to get started!' : 'No habits match your current filters.'}</p>
                </div>
            `;
            return;
        }

        habitsList.innerHTML = filteredHabits.map(habit => {
            const today = new Date().toDateString();
            const habitCompletions = this.completions[habit.id] || [];
            const completedToday = habitCompletions.includes(today);
            const progress = Math.min((habit.completed / habit.goal) * 100, 100);
            const isOverdue = this.isHabitOverdue(habit);

            return `
                <div class="habit-card" data-category="${habit.category}">
                    <div class="habit-header">
                        <div class="habit-info">
                            <h3>${habit.name}</h3>
                            <p>${habit.description || 'No description'}</p>
                        </div>
                        <div class="habit-actions">
                            ${completedToday ? 
                                '<button class="btn btn-success" disabled><i class="fas fa-check"></i> Completed</button>' :
                                '<button class="btn btn-success" onclick="habitTracker.completeHabit(\'' + habit.id + '\')"><i class="fas fa-check"></i> Complete</button>'
                            }
                            <button class="btn btn-danger" onclick="habitTracker.deleteHabit('${habit.id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                    <div class="habit-meta">
                        <span><i class="fas fa-tag"></i> ${this.getCategoryName(habit.category)}</span>
                        <span><i class="fas fa-calendar"></i> ${habit.frequency}</span>
                        <span><i class="fas fa-fire"></i> ${habit.streak} day streak</span>
                        <span><i class="fas fa-trophy"></i> ${habit.completed}/${habit.goal} completed</span>
                    </div>
                    <div class="habit-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" data-category="${habit.category}" style="width: ${progress}%"></div>
                        </div>
                        <small>${Math.round(progress)}% complete</small>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderGoals() {
        const goalsList = document.getElementById('goalsList');

        if (this.goals.length === 0) {
            goalsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bullseye"></i>
                    <h3>No goals set</h3>
                    <p>Add your first goal to start tracking your progress!</p>
                </div>
            `;
            return;
        }

        goalsList.innerHTML = this.goals.map(goal => {
            const progress = this.goalProgress[goal.id] || 0;
            const daysLeft = this.getDaysLeft(goal.deadline);
            const isOverdue = daysLeft < 0;

            return `
                <div class="goal-card" style="border-left-color: ${goal.color}">
                    <div class="goal-header">
                        <div class="goal-info">
                            <h3>${goal.title}</h3>
                            <p>${goal.description || 'No description'}</p>
                        </div>
                        <div class="goal-actions">
                            <button class="btn btn-primary" onclick="habitTracker.updateGoalProgress('${goal.id}', 1)">
                                <i class="fas fa-plus"></i> Progress
                            </button>
                            <button class="btn btn-danger" onclick="habitTracker.deleteGoal('${goal.id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                    <div class="goal-progress">
                        <div class="goal-stats">
                            <span>${goal.current}/${goal.target} ${goal.unit}</span>
                            <span>${Math.round(progress)}% complete</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%; background: ${goal.color}"></div>
                        </div>
                        <small>
                            ${isOverdue ? 
                                `${Math.abs(daysLeft)} days overdue` : 
                                `${daysLeft} days remaining`
                            }
                        </small>
                    </div>
                </div>
            `;
        }).join('');
    }

    isHabitOverdue(habit) {
        const today = new Date();
        const lastCompleted = habit.lastCompleted ? new Date(habit.lastCompleted) : null;
        
        if (!lastCompleted) return true;
        
        const daysSinceLastCompletion = Math.floor((today - lastCompleted) / (1000 * 60 * 60 * 24));
        
        switch (habit.frequency) {
            case 'daily':
                return daysSinceLastCompletion > 1;
            case 'weekly':
                return daysSinceLastCompletion > 7;
            case 'monthly':
                return daysSinceLastCompletion > 30;
            default:
                return false;
        }
    }

    getDaysLeft(deadline) {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    getCategoryName(category) {
        const categories = {
            'health': 'Health & Fitness',
            'productivity': 'Productivity',
            'learning': 'Learning',
            'mindfulness': 'Mindfulness',
            'social': 'Social',
            'other': 'Other'
        };
        return categories[category] || category;
    }

    initCharts() {
        this.renderWeeklyChart();
        this.renderCategoryChart();
    }

    renderWeeklyChart() {
        const ctx = document.getElementById('weeklyChart');
        if (!ctx) return;

        // Destroy existing chart
        if (this.weeklyChart) {
            this.weeklyChart.destroy();
        }

        const last7Days = [];
        const completionData = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateString = date.toDateString();
            last7Days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
            
            let completions = 0;
            Object.values(this.completions).forEach(habitCompletions => {
                if (habitCompletions.includes(dateString)) {
                    completions++;
                }
            });
            completionData.push(completions);
        }

        this.weeklyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Days,
                datasets: [{
                    label: 'Habits Completed',
                    data: completionData,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    renderCategoryChart() {
        const ctx = document.getElementById('categoryChart');
        if (!ctx) return;

        // Destroy existing chart
        if (this.categoryChart) {
            this.categoryChart.destroy();
        }

        const categoryCounts = {};
        this.habits.forEach(habit => {
            categoryCounts[habit.category] = (categoryCounts[habit.category] || 0) + 1;
        });

        const categories = Object.keys(categoryCounts);
        const counts = Object.values(categoryCounts);
        const colors = ['#48bb78', '#4299e1', '#ed8936', '#9f7aea', '#f56565', '#718096'];

        this.categoryChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: categories.map(cat => this.getCategoryName(cat)),
                datasets: [{
                    data: counts,
                    backgroundColor: colors.slice(0, categories.length),
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    showMessage(message, type = 'info') {
        const messageContainer = document.getElementById('messageContainer');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = message;

        messageContainer.appendChild(messageElement);

        // Remove message after 3 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }

    saveData() {
        localStorage.setItem('habits', JSON.stringify(this.habits));
        localStorage.setItem('goals', JSON.stringify(this.goals));
        localStorage.setItem('completions', JSON.stringify(this.completions));
        localStorage.setItem('goalProgress', JSON.stringify(this.goalProgress));
    }

    loadSampleData() {
        // Only load sample data if no habits exist
        if (this.habits.length === 0) {
            const sampleHabits = [
                {
                    id: 'sample1',
                    name: 'Morning Exercise',
                    description: '30 minutes of cardio or strength training',
                    category: 'health',
                    frequency: 'daily',
                    goal: 1,
                    color: '#48bb78',
                    createdAt: new Date().toISOString(),
                    completed: 3,
                    streak: 3,
                    lastCompleted: new Date().toISOString()
                },
                {
                    id: 'sample2',
                    name: 'Read Books',
                    description: 'Read at least 20 pages',
                    category: 'learning',
                    frequency: 'daily',
                    goal: 1,
                    color: '#ed8936',
                    createdAt: new Date().toISOString(),
                    completed: 5,
                    streak: 2,
                    lastCompleted: new Date().toISOString()
                },
                {
                    id: 'sample3',
                    name: 'Meditation',
                    description: '10 minutes of mindfulness practice',
                    category: 'mindfulness',
                    frequency: 'daily',
                    goal: 1,
                    color: '#9f7aea',
                    createdAt: new Date().toISOString(),
                    completed: 7,
                    streak: 7,
                    lastCompleted: new Date().toISOString()
                }
            ];

            const sampleGoals = [
                {
                    id: 'goal1',
                    title: 'Read 12 Books This Year',
                    description: 'Complete one book per month',
                    target: 12,
                    unit: 'books',
                    deadline: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0],
                    color: '#4299e1',
                    createdAt: new Date().toISOString(),
                    current: 3
                },
                {
                    id: 'goal2',
                    title: 'Run 500 Miles',
                    description: 'Track running distance throughout the year',
                    target: 500,
                    unit: 'miles',
                    deadline: new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0],
                    color: '#48bb78',
                    createdAt: new Date().toISOString(),
                    current: 45
                }
            ];

            this.habits = sampleHabits;
            this.goals = sampleGoals;
            this.goalProgress = {
                'goal1': 25,
                'goal2': 9
            };
            this.completions = {
                'sample1': [new Date().toDateString(), new Date(Date.now() - 86400000).toDateString(), new Date(Date.now() - 172800000).toDateString()],
                'sample2': [new Date().toDateString(), new Date(Date.now() - 86400000).toDateString()],
                'sample3': [new Date().toDateString(), new Date(Date.now() - 86400000).toDateString(), new Date(Date.now() - 172800000).toDateString(), new Date(Date.now() - 259200000).toDateString(), new Date(Date.now() - 345600000).toDateString(), new Date(Date.now() - 432000000).toDateString(), new Date(Date.now() - 518400000).toDateString()]
            };

            this.saveData();
            this.renderDashboard();
            this.renderHabits();
            this.renderGoals();
            this.initCharts();
        }
    }
}

// Initialize the application
let habitTracker;
document.addEventListener('DOMContentLoaded', () => {
    habitTracker = new HabitTracker();

}); 
