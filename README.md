# Goal-Track
A web application for tracking personal habits and achieving goals.
# HabitTracker - Personal Goals & Habits Web Application

A beautiful, modern web application for tracking personal habits and achieving goals. Built with HTML, CSS, and JavaScript, featuring a responsive design and comprehensive functionality.

## 🌟 Features

### 📊 Dashboard Overview
- **Current Streak**: Track your longest active habit streak
- **Active Habits**: Total number of habits you're tracking
- **Completed Today**: Habits completed on the current day
- **Goal Progress**: Overall progress across all your goals

### 🎯 Habit Management
- **Add New Habits**: Create habits with custom names, descriptions, and categories
- **Categories**: Organize habits into Health & Fitness, Productivity, Learning, Mindfulness, Social, and Other
- **Frequency Tracking**: Set habits as daily, weekly, or monthly
- **Progress Tracking**: Visual progress bars and completion statistics
- **Streak Calculation**: Automatic streak tracking for consecutive completions
- **Color Coding**: Custom colors for each habit category

### 🎯 Goal Setting
- **Long-term Goals**: Set specific targets with deadlines
- **Progress Tracking**: Update progress incrementally
- **Visual Progress**: Progress bars and percentage completion
- **Deadline Management**: Track days remaining or overdue

### 📈 Analytics & Charts
- **Weekly Progress Chart**: Line chart showing habit completions over the last 7 days
- **Category Distribution**: Doughnut chart showing habit distribution by category
- **Real-time Updates**: Charts update automatically as you complete habits

### 🔍 Filtering & Organization
- **Category Filters**: Filter habits by category
- **Status Filters**: View completed, active, or overdue habits
- **Search & Sort**: Easy navigation through your habits and goals

### 💾 Data Persistence
- **Local Storage**: All data is saved locally in your browser
- **No Account Required**: Start tracking immediately without registration
- **Sample Data**: Pre-loaded sample habits and goals to get you started

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Download or clone the repository
2. Open `index.html` in your web browser
3. Start tracking your habits immediately!

### Using Visual Studio Code
1. Open the project folder in VS Code
2. Install the "Live Server" extension for real-time preview
3. Right-click on `index.html` and select "Open with Live Server"
4. The application will open in your default browser

## 📱 How to Use

### Adding a New Habit
1. Scroll to the "Add New Habit" section
2. Fill in the habit details:
   - **Name**: Give your habit a clear, memorable name
   - **Description**: Optional description for context
   - **Category**: Choose from predefined categories
   - **Frequency**: Set how often you want to do this habit
   - **Goal**: Set the target number of times per period
   - **Color**: Choose a custom color theme
3. Click "Add Habit"

### Completing a Habit
1. Find the habit in your habits list
2. Click the "Complete" button
3. The habit will be marked as completed for today
4. Your streak and progress will update automatically

### Adding a Goal
1. Click the "Add Goal" button in the Goals section
2. Fill in the goal details:
   - **Title**: Name your goal
   - **Description**: Optional description
   - **Target**: Set your target value
   - **Unit**: Define the unit (books, miles, hours, etc.)
   - **Deadline**: Set a target date
   - **Color**: Choose a custom color
3. Click "Add Goal"

### Updating Goal Progress
1. Find your goal in the goals list
2. Click the "Progress" button to increment by 1
3. The progress bar and percentage will update automatically

### Filtering Habits
1. Use the category dropdown to filter by habit type
2. Use the status dropdown to view:
   - **All Status**: Show all habits
   - **Active**: Habits not completed today
   - **Completed**: Habits completed today
   - **Overdue**: Habits that should have been completed

## 🎨 Design Features

### Modern UI/UX
- **Glassmorphism Design**: Beautiful frosted glass effects
- **Gradient Backgrounds**: Eye-catching color schemes
- **Smooth Animations**: Hover effects and transitions
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile

### Color Coding
- **Health & Fitness**: Green (#48bb78)
- **Productivity**: Blue (#4299e1)
- **Learning**: Orange (#ed8936)
- **Mindfulness**: Purple (#9f7aea)
- **Social**: Red (#f56565)
- **Other**: Gray (#718096)

### Interactive Elements
- **Hover Effects**: Cards lift and glow on hover
- **Progress Animations**: Smooth progress bar transitions
- **Modal Dialogs**: Clean goal creation interface
- **Toast Messages**: Success and error notifications

## 📊 Data Structure

### Habit Object
```javascript
{
  id: "unique_id",
  name: "Habit Name",
  description: "Description",
  category: "health|productivity|learning|mindfulness|social|other",
  frequency: "daily|weekly|monthly",
  goal: 1,
  color: "#hexcolor",
  createdAt: "ISO_date",
  completed: 0,
  streak: 0,
  lastCompleted: "ISO_date"
}
```

### Goal Object
```javascript
{
  id: "unique_id",
  title: "Goal Title",
  description: "Description",
  target: 100,
  unit: "books|miles|hours",
  deadline: "YYYY-MM-DD",
  color: "#hexcolor",
  createdAt: "ISO_date",
  current: 0
}
```

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Object-oriented programming with classes
- **Chart.js**: Interactive data visualization
- **Font Awesome**: Icon library
- **Google Fonts**: Inter font family

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Local Storage
The application uses browser localStorage to persist:
- Habits data
- Goals data
- Completion tracking
- Goal progress

## 🎯 Best Practices for Habit Tracking

### Setting Effective Habits
1. **Start Small**: Begin with 1-2 habits, not 10
2. **Be Specific**: "Read 20 pages" vs "Read more"
3. **Stack Habits**: Link new habits to existing routines
4. **Track Consistently**: Use the app daily to build momentum

### Goal Setting Tips
1. **SMART Goals**: Specific, Measurable, Achievable, Relevant, Time-bound
2. **Break Down**: Large goals into smaller milestones
3. **Regular Review**: Check progress weekly
4. **Celebrate Wins**: Acknowledge your achievements

## 🚀 Future Enhancements

Potential features for future versions:
- **Data Export**: Export habits and progress data
- **Reminders**: Push notifications for habit completion
- **Social Features**: Share progress with friends
- **Advanced Analytics**: More detailed progress insights
- **Habit Templates**: Pre-built habit suggestions
- **Dark Mode**: Alternative color scheme
- **Backup & Sync**: Cloud storage integration

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help with the application, please open an issue in the repository.

---

**Happy Habit Tracking! 🎉**

*Built with ❤️ for personal development and goal achievement.* 
