# Use an official Python slim runtime as a parent image
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project code into the container
COPY . /app/

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port 8000 (Render will detect this or we can configure it)
EXPOSE 8000

# Start Gunicorn WSGI server
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
