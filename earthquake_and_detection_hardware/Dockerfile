# ─── Earthquake Detection Hardware – Simulator Container ──────────────────────
#
# The Arduino sketch (.ino) runs on physical hardware.
# This container simulates the ADXL335 accelerometer by POSTing synthetic
# readings to the backend every 500 ms — identical to what real hardware does.
#
# To compile the sketch instead, use the arduino-cli stage in docker-compose.yml
# by setting: build.target: compiler  (not needed for normal local dev)
# ──────────────────────────────────────────────────────────────────────────────
FROM python:3.11-slim

WORKDIR /simulator

# Install requests for HTTP POSTs to the backend
RUN pip install --no-cache-dir requests

# Copy the simulator script
COPY simulate.py .

# Environment variables (overridable in docker-compose.yml)
ENV BACKEND_URL=http://backend:5000
ENV INTERVAL_SEC=0.5
ENV QUAKE_PROB=0.005

CMD ["python", "-u", "simulate.py"]
