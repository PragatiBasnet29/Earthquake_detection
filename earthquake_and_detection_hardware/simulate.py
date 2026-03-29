#!/usr/bin/env python3
"""
Hardware Simulator
==================
Continuously generates synthetic ADXL335 accelerometer readings and POSTs
them to the backend at POST /, mimicking the real Arduino + GSM hardware.

Environment variables:
  BACKEND_URL   URL of the backend  (default: http://backend:5000)
  INTERVAL_SEC  Seconds between samples (default: 0.5)
  QUAKE_PROB    Probability of a quake event per tick (default: 0.005)
"""
import os, random, time, datetime
import requests

BACKEND_URL = os.getenv("BACKEND_URL", "http://backend:5000")
INTERVAL    = float(os.getenv("INTERVAL_SEC", "0.5"))
QUAKE_PROB  = float(os.getenv("QUAKE_PROB",   "0.005"))

quake_mode  = False
quake_timer = 0


def ts():
    return datetime.datetime.now().strftime("%H:%M:%S")


def next_reading():
    global quake_mode, quake_timer

    if not quake_mode and random.random() < QUAKE_PROB:
        quake_mode  = True
        quake_timer = random.randint(10, 30)
        print(f"[{ts()}] 🔴 Simulated earthquake started!", flush=True)

    if quake_mode:
        intensity = random.gauss(4.5, 1.5)
        data = dict(
            x=round(random.gauss(0, intensity), 4),
            y=round(random.gauss(0, intensity), 4),
            z=round(random.gauss(9.81, intensity * 0.5), 4),
        )
        quake_timer -= 1
        if quake_timer <= 0:
            quake_mode = False
            print(f"[{ts()}] ✅ Earthquake event ended.", flush=True)
    else:
        data = dict(
            x=round(random.gauss(0, 0.15), 4),
            y=round(random.gauss(0, 0.15), 4),
            z=round(random.gauss(9.81, 0.08), 4),
        )
    return data


print(f"🛰  Hardware Simulator → {BACKEND_URL}  (interval={INTERVAL}s)", flush=True)
print("    Waiting for backend to be ready...", flush=True)

while True:
    reading = next_reading()
    try:
        r = requests.post(BACKEND_URL, json=reading, timeout=3)
        print(f"[{ts()}] POST {reading}  →  {r.status_code}", flush=True)
    except requests.exceptions.ConnectionError:
        print(f"[{ts()}] ⚠️  Cannot reach backend at {BACKEND_URL}, retrying…", flush=True)
    except Exception as e:
        print(f"[{ts()}] ❌ Error: {e}", flush=True)

    time.sleep(INTERVAL)
