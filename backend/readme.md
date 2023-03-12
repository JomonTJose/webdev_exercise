# API Documentation
# ------------------------------

## Routes

### /users {POST}
    * Creates Users in bulk

    * Response
        'Users Created'

### /users {DELETE}
    * DELETE Users in bulk

    * Response
        'Users deleted'

### /users {GET}
    * Returns List of users in the memory

    * Response:
        {
            "users": [
                {
                    "id": 1,
                    "name": "Kathy Little",
                    "skills": []
                },
                {
                    "id": 2,
                    "name": "Samuel Sherman",
                    "skills": []
                }
            ]
        }

### /users?skills=react {GET}
    * Returns List of users with specific skills

    * Response:
        {
            "users": [
                {
                    "id": 1,
                    "name": "Kathy Little",
                    "skills": ["react"]
                }
            ]
        }

### /users/{user-id}/skills  {PUT}
    * Returns List of users with specific skills

    * Example: `/users/6/skills`
    * Request Body:
        {
            "skills": [
                "React",
                "JS"
            ]
        }
    
    * Response:
        {
            "users": [
                {
                    "id": 6,
                    "name": "Michael Roberts",
                    "skills": [
                        "JS",
                        "React"
                    ]
                }
            ]
        }

### /skills {GET}
    * Returns List of skills

    * Response:
        {
            "skills": [
                "react",
                "javascript",
                "python"
            ]
        }