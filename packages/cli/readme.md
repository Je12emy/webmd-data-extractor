# Jira Data Extractor CLI

A command-line tool to extract and analyze data from Jira. This tool provides insights into sprint completion rates and team member velocity across different boards and sprints.

## Features

- **Sprint Completion Analysis**: Generate reports showing completion percentages for selected sprints
- **Team Velocity Tracking**: Analyze individual team member performance across sprints
- **Interactive CLI**: User-friendly command-line interface with interactive board and sprint selection
- **Multiple Board Support**: Configure and analyze data from multiple Jira boards
- **Flexible Sprint Selection**: Choose specific sprints to analyze or set limits on the number of sprints to fetch
- **Story Points Integration**: Calculate velocity using custom story points field
- **Tabular Output**: Clean, formatted table output for easy data analysis

## Configuration

The tool requires a `config.json` file in the project root with the following structure:

```json
{
  "jira": {
    "host": "https://your-jira-instance.com",
    "token": "your-jira-api-token"
  },
  "boards": [
    {
      "id": 2028,
      "name": "Your Board Name",
      "members": [
        {
          "displayName": "John Doe",
          "name": "jdoe",
          "key": "JIRAUSER12345"
        }
      ]
    }
  ]
}
```

### Configuration Fields

- **jira.host**: Your Jira instance URL
- **jira.token**: Your Jira API token for authentication
- **boards**: Array of board configurations
  - **id**: Jira board ID
  - **name**: Display name for the board
  - **members**: Array of team members for velocity tracking
    - **displayName**: Full name of the team member
    - **name**: Jira username
    - **key**: Jira user key

### Getting Your Jira API Token

1. Log in to your Jira instance
2. Go to your account settings
3. Navigate to Security → API tokens
4. Create a new API token
5. Copy the token to your `config.json`

## Usage

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `config.json` file (see Configuration section)

### Development Mode

Run the tool in development mode:

```bash
npm run dev
```

### Production Build

Build and run the compiled version:

```bash
npm run build
npm start
```

### Available Commands

#### Sprint Completion Analysis

Analyze sprint completion rates:

```bash
npm run dev completion [options]
```

Options:

- `-l, --limit <number>`: Number of sprints to fetch (default: 10)

This command will:

1. Prompt you to select a board
2. Show available sprints for selection
3. Generate a completion report showing:
   - Sprint name
   - Total issues
   - Incomplete issues
   - Completion percentage
   - Start and end dates

#### Team Velocity Analysis

Analyze team member velocity:

```bash
npm run dev velocity [options]
```

Options:

- `-l, --limit <number>`: Number of sprints to fetch (default: 10)

This command will:

1. Prompt you to select a board
2. Show available sprints for selection
3. Allow selection of team members to analyze
4. Generate velocity reports showing:
   - Team member name
   - Number of issues completed
   - Total story points completed

### Example Output

**Completion Report:**

```
┌─────────┬──────────────────┬─────────────┬───────────────────┬────────────┐
│ (index) │       name       │ totalIssues │ incompleteIssues  │ completion │
├─────────┼──────────────────┼─────────────┼───────────────────┼────────────┤
│    0    │   'Sprint 1'     │     25      │         3         │    88      │
│    1    │   'Sprint 2'     │     30      │         5         │    83.33   │
└─────────┴──────────────────┴─────────────┴───────────────────┴────────────┘
```

**Velocity Report:**

```
Sprint: Sprint 1
┌─────────┬──────────────┬─────────────┬─────────────┐
│ (index) │    member    │ issuesCount │ totalPoints │
├─────────┼──────────────┼─────────────┼─────────────┤
│    0    │  'John Doe'  │      8      │     21      │
│    1    │ 'Jane Smith' │      6      │     18      │
└─────────┴──────────────┴─────────────┴─────────────┘
```
