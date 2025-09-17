# 🎯 GoalTrack

**GoalTrack** is a comprehensive personal habit and goal tracking web application built with Django. Track your daily habits, set long-term goals, and monitor your progress with beautiful visualizations.

## ✨ Features

### 🏃‍♂️ Habit Tracking
- **Create & Manage Habits**: Add habits with custom frequencies (daily, weekly, monthly)
- **Progress Tracking**: Log daily progress with completion status
- **Visual Progress Bars**: See your completion percentage with interactive progress bars
- **Habit History**: View all your progress entries with dates

### 🎯 Goal Management
- **Smart Goal Setting**: Create goals with target dates and descriptions
- **Progress Monitoring**: Track progress with percentage completion (0-100%)
- **Progress Notes**: Add detailed notes about what you've accomplished
- **Goal Status**: Mark goals as completed or keep them active

### 🔐 User Authentication
- **Secure Registration**: Create accounts with username, email, and password
- **Login/Logout**: Secure authentication system
- **User Isolation**: Each user can only see and manage their own data

### 📊 Dashboard
- **Unified View**: Everything in one beautiful dashboard
- **Progress Summary**: Visual progress bars for habits and goals
- **Quick Actions**: Fast access to add habits, goals, and log progress
- **Responsive Design**: Works perfectly on desktop and mobile

## 🛠 Tech Stack

- **Backend**: Python 3.13+ with Django 5.2
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Database**: SQLite (development), easily switchable to PostgreSQL/MySQL
- **Styling**: Custom CSS with responsive design
- **Authentication**: Django's built-in user authentication system

## 🚀 Quick Start

### Prerequisites
- Python 3.13 or higher
- pip (Python package installer)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/goaltrack.git
cd goaltrack
```

2. **Create virtual environment**
```bash
# Windows
py -3 -m venv .venv
.\.venv\Scripts\activate

# macOS/Linux
python3 -m venv .venv
source .venv/bin/activate
```

3. **Install dependencies**
```bash
pip install --upgrade pip setuptools wheel
pip install django
```

4. **Run migrations**
```bash
python goaltrack_project/manage.py makemigrations
python goaltrack_project/manage.py migrate
```

5. **Create superuser (optional)**
```bash
python goaltrack_project/manage.py createsuperuser
```

6. **Start development server**
```bash
python goaltrack_project/manage.py runserver
```

7. **Open your browser**
Navigate to `http://127.0.0.1:8000/` and start tracking!

## 📱 Usage

### Getting Started
1. **Register**: Create your account at `/register/`
2. **Login**: Sign in to access your dashboard
3. **Add Habits**: Create daily, weekly, or monthly habits
4. **Set Goals**: Define your long-term objectives
5. **Track Progress**: Log your daily achievements

### Key URLs
- **Home/Dashboard**: `/` - Everything in one place
- **Add Habit**: `/habits/add/`
- **Add Goal**: `/goals/add/`
- **View Progress**: `/habits/{id}/progress/`
- **Admin Panel**: `/admin/` (for superusers)

## 🏗 Project Structure

```
goaltrack/
├── goaltrack_project/          # Django project settings
│   ├── settings.py            # Project configuration
│   ├── urls.py               # Main URL routing
│   └── wsgi.py               # WSGI configuration
├── tracker/                   # Main Django app
│   ├── models.py             # Database models
│   ├── views.py              # View functions
│   ├── forms.py              # Django forms
│   ├── urls.py               # App URL routing
│   ├── admin.py              # Admin interface
│   └── templates/            # HTML templates
│       └── tracker/
│           ├── home.html     # Main dashboard
│           ├── habits/       # Habit-related templates
│           └── goals/        # Goal-related templates
├── .venv/                    # Virtual environment
├── db.sqlite3               # SQLite database
└── manage.py                # Django management script
```

## 🎨 Screenshots

### Dashboard View
![Dashboard](screenshots/dashboard.png)
*Unified dashboard showing habits and goals with progress bars*

### Habit Tracking
![Habits](screenshots/habits.png)
*Habit creation and progress tracking interface*

### Goal Management
![Goals](screenshots/goals.png)
*Goal setting with progress percentage and notes*

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the project root:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

### Database Configuration
To switch from SQLite to PostgreSQL or MySQL, update `settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'goaltrack_db',
        'USER': 'your_username',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow PEP 8 style guidelines
- Write descriptive commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Django community for the excellent framework
- Contributors who helped improve this project
- Users who provided valuable feedback

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Issues**: Look through existing GitHub issues
2. **Create a New Issue**: Describe your problem with details
3. **Contact**: Reach out to the maintainers

## 🔮 Roadmap

### Planned Features
- [ ] **Data Export**: Export habits and goals to CSV/PDF
- [ ] **Analytics**: Advanced progress analytics and insights
- [ ] **Notifications**: Email reminders for habits and goals
- [ ] **Mobile App**: Native mobile application
- [ ] **Social Features**: Share progress with friends
- [ ] **Categories**: Organize habits and goals by categories
- [ ] **Streaks**: Track consecutive days of habit completion
- [ ] **Achievements**: Badge system for milestones

### Version History
- **v1.0.0** - Initial release with basic habit and goal tracking
- **v1.1.0** - Added progress percentage and notes for goals
- **v1.2.0** - Enhanced dashboard with unified view

---

**Made with ❤️ for productivity enthusiasts**

⭐ **Star this repository if you found it helpful!**
