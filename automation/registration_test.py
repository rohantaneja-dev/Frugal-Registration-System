from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import os

SCREENSHOT_DIR = "../screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)
driver.maximize_window()

file_path = os.path.abspath("../frontend/index.html")
driver.get("file://" + file_path)

print("URL:", driver.current_url)
print("Title:", driver.title)

time.sleep(2)

driver.find_element(By.ID, "firstName").send_keys("Rohan")
driver.find_element(By.ID, "email").send_keys("rohan@test.com")
driver.find_element(By.ID, "phone").send_keys("9876543210")

driver.find_element(By.XPATH, "//input[@value='Male']").click()
driver.find_element(By.ID, "terms").click()

driver.find_element(By.ID, "submitBtn").click()
time.sleep(2)

driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "error-state.png"))

driver.find_element(By.ID, "lastName").send_keys("Taneja")
driver.find_element(By.ID, "password").send_keys("password123")
driver.find_element(By.ID, "confirmPassword").send_keys("password123")

time.sleep(2)
driver.find_element(By.ID, "submitBtn").click()

time.sleep(2)
driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "success-state.png"))

print("Automation completed successfully")

driver.quit()
