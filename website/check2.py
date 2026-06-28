from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch()
    page = b.new_page(viewport={'width':390,'height':844})
    page.goto('file:///D:/Madhu/Coding/PO 2026/website/index.html')
    page.wait_for_timeout(500)
    print('docEl scrollWidth', page.evaluate('document.documentElement.scrollWidth'), 'clientWidth', page.evaluate('document.documentElement.clientWidth'))
    page.mouse.wheel(0, 12200)
    page.wait_for_timeout(600)
    page.screenshot(path='contact_check.png')
    b.close()
