from pathlib import Path
import subprocess
import json
import re

IMAGE_DIR = Path("images")

extensions = {
    ".png",
    ".jpg",
    ".jpeg",
    ".jfif",
    ".webp"
}

images = [
    file for file in IMAGE_DIR.iterdir()
    if file.is_file() and file.suffix.lower() in extensions
]

if not images:
    print("В папке images нет изображений.")
    exit()


def normalize_text(text):
    text = text.lower()
    text = text.replace("—", "-")
    text = text.replace("–", "-")
    text = text.replace(":", ":")
    return text


def check_screenshot(image):
    result = subprocess.run(
        [
            r"C:\Program Files\Tesseract-OCR\tesseract.exe",
            str(image),
            "stdout",
            "-l",
            "rus",
        ],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace"
    )

    text = result.stdout.strip()
    normalized = normalize_text(text)

    # Проверяем магазин
    store_found = "smoky market" in normalized

    # Ищем часы
    allowed_hours = [
        "11:00-00:00",
        "11:00-00:30",
        "12:30-1:30",
        "12:30-2:00",
    ]

    hours_found = any(hours in normalized for hours in allowed_hours)

    problems = []

    if not store_found:
        problems.append("Название магазина Smoky Market не найдено")

    if not hours_found:
        problems.append("Допустимые часы работы не найдены")

    if store_found and hours_found:
        status = "needs_manager_review"
        message = "Доказательство соответствует условиям и передано менеджеру на проверку"
    else:
        status = "not_passed"
        message = "Доказательство не соответствует условиям задачи"

    return {
        "file": image.name,
        "task": "Сторис с часами работы",
        "store": "Smoky Market",
        "store_found": store_found,
        "hours_found": hours_found,
        "status": status,
        "message": message,
        "problems": problems,
        "ocr_text": text
    }


for image in images:
    result = check_screenshot(image)

    print(json.dumps(
        result,
        ensure_ascii=False,
        indent=2
    ))