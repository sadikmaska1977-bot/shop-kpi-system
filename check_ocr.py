import subprocess
import re

IMAGE = "test.png"

result = subprocess.run(
    [
        r"C:\Program Files\Tesseract-OCR\tesseract.exe",
        IMAGE,
        "stdout",
        "-l",
        "rus",
    ],
    capture_output=True,
    text=True,
    encoding="utf-8",
)

text = result.stdout

print("=== РАСПОЗНАННЫЙ ТЕКСТ ===")
print(text)

print("\n=== ПРОВЕРКА ===")

# Название магазина
store_found = "smoky market" in text.lower()

# Допустимые варианты часов
allowed_hours = [
    "11:00–00:00",
    "11:00-00:00",
    "11:00–00:30",
    "11:00-00:30",
    "12:30–1:30",
    "12:30-1:30",
    "12:30–2:00",
    "12:30-2:00",
]

hours_found = any(hours in text for hours in allowed_hours)

if store_found:
    print("✓ Smoky Market найден")
else:
    print("✗ Smoky Market НЕ найден")

if hours_found:
    print("✓ Допустимые часы работы найдены")
else:
    print("✗ Часы работы НЕ найдены")

if store_found and hours_found:
    print("\nРЕЗУЛЬТАТ: ТРЕБУЕТ ПРОВЕРКИ МЕНЕДЖЕРА")
else:
    print("\nРЕЗУЛЬТАТ: НЕ ПРОЙДЕНО")