from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import os

# ---------- SETUP ----------
SCREENSHOT_DIR = "../screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)
wait = WebDriverWait(driver, 10)

driver.maximize_window()

file_path = os.path.abspath("../frontend/index.html")
driver.get("file://" + file_path)

print("Opened URL:", driver.current_url)
print("Page Title:", driver.title)

# ---------- TEST CASE 1 : NEGATIVE ----------
print("\nTEST CASE 1: Negative validation check")

wait.until(EC.presence_of_element_located((By.ID, "firstName")))

driver.find_element(By.ID, "firstName").send_keys("Rohan")
driver.find_element(By.ID, "email").send_keys("rohan@gmail.com")
driver.find_element(By.ID, "phone").send_keys("12345")

driver.find_element(By.XPATH, "//input[@value='Male']").click()
driver.find_element(By.ID, "terms").click()

driver.find_element(By.ID, "submitBtn").click()
time.sleep(1)

driver.execute_script("window.scrollTo(0, 0);")
time.sleep(1)

driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "negative-validation.png"))
print("❌ Negative screenshot captured")

# ---------- RESET ----------
driver.refresh()
wait.until(EC.presence_of_element_located((By.ID, "firstName")))

# ---------- TEST CASE 2 : POSITIVE ----------
print("\nTEST CASE 2: Successful registration")

driver.find_element(By.ID, "firstName").send_keys("Rohan")
driver.find_element(By.ID, "lastName").send_keys("Taneja")
driver.find_element(By.ID, "email").send_keys("rohan@gmail.com")
driver.find_element(By.ID, "phone").send_keys("+919876543210")
driver.find_element(By.ID, "address").send_keys("Patiala Punjab India")

driver.find_element(By.XPATH, "//input[@value='Male']").click()

driver.find_element(By.ID, "country").send_keys("India")
time.sleep(1)
driver.find_element(By.ID, "state").send_keys("Punjab")
time.sleep(1)
driver.find_element(By.ID, "city").send_keys("Patiala")

driver.find_element(By.ID, "password").send_keys("password123")
driver.find_element(By.ID, "confirmPassword").send_keys("password123")

driver.find_element(By.ID, "terms").click()
driver.find_element(By.ID, "submitBtn").click()

# ✅ WAIT FOR GREEN ALERT
wait.until(
    EC.text_to_be_present_in_element(
        (By.ID, "formAlert"),
        "Registration Successful!"
    )
)

# ✅ SCROLL TO TOP BEFORE SCREENSHOT (CRITICAL FIX)
driver.execute_script("window.scrollTo(0, 0);")
time.sleep(1)

driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "successful-registration.png"))
print("✅ Filled-form success screenshot captured")

print("\nAutomation execution completed successfully")
driver.quit()
