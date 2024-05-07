from selenium import webdriver
from selenium.webdriver.chrome.service import Service

service = Service(excutable_path="chromedriver.exe")
driver = webdriver.Chrome(service=service)

URL = "https://maturity-project.web.app/"


class Login_Information:
    username = "radoslav.kollar@kosickaakademia.sk"
    password = "asdfghjkl"