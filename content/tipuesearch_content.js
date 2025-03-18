var tipuesearch = {"pages": [{'title': 'About', 'text': '課程名稱: 協同產品設計實習 - Collaborative Product Design Practice \n 學員作業網站:\xa0 https://mdecd2025.github.io/hw-41223243/content/index.html \n 學員作業倉儲:  https://github.com/mdecd2025/hw-41223243 \n \n 課程代號: cd2025 \n Teams 線上教學: \n 以 "學號@nfu.edu.tw" 登入 \xa0 https://login.microsoftonline.com/ \xa0 Office 365 \n Teams 團隊代碼:\xa0 p5z4eku \n \n 課程評分: \n Homework (30%) - 每週至少提交兩次與課程進度有關的內容, 完成後填回自評表單 \n Exam (40%) - 建立包含操作流程影片、心得以及提供檔案下載的網頁後填回自評表單 \n Final Report (30%) - 利用網頁內容進行簡報並提交 pdf 格式書面報告, 完成後填回自評表單 \n \n', 'tags': '', 'url': 'About.html'}, {'title': 'repo', 'text': '', 'tags': '', 'url': 'repo.html'}, {'title': 'Tasks', 'text': '???', 'tags': '', 'url': 'Tasks.html'}, {'title': 'task1', 'text': '組員名單: 41223221 、 41223212 、 41223211 、 41223243 、 41223245 、 41223251 。 \n 首先是初版，這個版本有些問題，就是他會額外找出兩個不相關的，第一個是scrm-1與github.com，而且他無法根據使用者的名稱來自動修改網址。以我的為例: https://github.com/mdecd2025/hw-41223243 \n 我的能跑出來是因為我的使用者名稱是41223243，而我們的組員當中有些人的使用者名稱不等於學號，所以拿第一版去跑Brython，他會假設所有人都是 https://github.com/mdecd2025/hw-學號\xa0 這個樣子，那如果hw-後方不是學號他就讀不到。 \n 然後是二版，二版解決了跳出不相干人員的問題，但第二個問題還是沒有解決，所以以這個東西為基準，我延伸出了第三版。 \n 三版算是一個比較折衷的作法，他能根據帳號去讀取使用者的名稱，如果使用者名稱不等於學號時，那他就會根據使用者名稱去修改hw-的後綴，假設我的使用者名稱是41223243，與帳號相同則hw-學號，而當兩者不同時，他會根據使用者名稱去自動修改成hw-使用者名稱。 \n (以下為AI解釋) \n 這段程式碼是基於  Brython  開發的，目的是從一個指定的 URL ( https://mde.tw/list/2b.txt ) 讀取學員的學號與帳號資料，並根據提供的學號清單顯示每位學員的帳號與對應的 GitHub 倉儲連結。如果帳號名稱與學號不一致，它會使用帳號名稱來生成 GitHub 倉儲 URL，反之則使用學號生成 URL。 \n 以當前來說是夠用的。 \n 以下為三版。 \n \xa0 \n from browser import html, document, window\n   \n# 設定資料來源 URL\nurl = "https://mde.tw/list/2b.txt"\n   \n# 特定學員的學號列表\ntarget_student_ids = ["41223243", "41223221", "41223211", "41223245", "41223251", "41223212"]  # 您指定的學號\n   \n# 利用 AJAX 來讀取遠端資料\ndef fetch_data():\n    # 使用 window.XMLHttpRequest 發送 HTTP GET 請求來讀取資料\n    xhr = window.XMLHttpRequest.new()\n    xhr.open("GET", url, True)\n       \n    # 定義資料載入完成後的處理邏輯\n    def onload(event):\n        # 檢查 HTTP 請求是否成功\n        if xhr.status == 200:\n            # 取得返回的資料\n            data = xhr.responseText.splitlines()\n               \n            # 進行診斷，確保資料格式正確\n            print(f"載入的資料：{data}")\n   \n            # 跳過標題行，獲取有效學員資料\n            all_stud = data[1:]  # 跳過標題行\n            print(f"有效學員資料：{all_stud}")\n   \n            # 顯示資料\n            brython_div1 = document["brython_div1"]\n   \n            # 清空顯示區域，避免重複顯示\n            brython_div1.clear()\n   \n            # 顯示特定學員資料及超連結\n            found_count = 0  # 記錄找到的學員數量\n   \n            for idx, stud in enumerate(all_stud, 1):\n                # 假設每一行資料格式為 "學號 帳號"\n                stud_info = stud.strip().split()\n                if len(stud_info) == 2:  # 確保格式正確\n                    student_id, account = stud_info\n                       \n                    # 檢查該學號是否在目標學號列表中\n                    if student_id in target_student_ids:\n                        # 檢查學號與帳號名稱是否一致\n                        if not account.startswith(f"hw-{student_id}"):\n                            # 如果學號與帳號名稱不一致，將倉儲 URL 改為 hw-帳號\n                            link = f"https://github.com/mdecd2025/hw-{account}"\n                        else:\n                            # 如果一致，使用學號來生成倉儲 URL\n                            link = f"https://github.com/mdecd2025/hw-{student_id}"\n                           \n                        brython_div1 <= html.BR()\n                        brython_div1 <= f"{idx}. 學號: {student_id} 帳號: " + html.A(account, href=link)\n   \n                        found_count += 1\n   \n            # 如果沒有找到學員資料，顯示提示信息\n            if found_count == 0:\n                brython_div1 <= html.BR()\n                brython_div1 <= "未找到指定學號的資料。"\n   \n    # 設定載入完成時的回呼\n    xhr.bind("load", onload)\n    xhr.send()\n   \n# 進行資料讀取\nfetch_data() \n \n \n', 'tags': '', 'url': 'task1.html'}, {'title': 'task2', 'text': '以ipv6位置開啟近端。 \n', 'tags': '', 'url': 'task2.html'}, {'title': 'task3', 'text': '利用cmd開啟並編輯動態倉儲。 \n \n 外部連結改為IPV6的指定位置。', 'tags': '', 'url': 'task3.html'}, {'title': 'task4', 'text': '', 'tags': '', 'url': 'task4.html'}, {'title': 'task5', 'text': '', 'tags': '', 'url': 'task5.html'}, {'title': 'task6', 'text': '', 'tags': '', 'url': 'task6.html'}, {'title': 'Homework', 'text': '作業 (30%) \n HW1 (5%):  建立由 Box 組成的平面四連桿機構 Webots 模擬場景 \n part1: \n 請各學員在 USB 隨身碟或個人電腦上完成 cd2025 課程所需的可攜系統配置: \n 下載  portable_wcm2025.7z  (330MB, 解開壓縮後 1.4GB) \n Webots_2025a.7z  (1.5 GB, 解開後約為 2.9GB, 可單獨運作) \n Webots_2025a_web.7z  (171 MB, 解開壓縮後約為 1GB, 必須連網運作) \n Blender4.2.7z \n part2: \n 請各學員完成可攜程式系統配置後, 利用 Webots R2025a 中寬度與高度都為 0.1m 的 box 物件建立一個簡單的平面四連桿機構模擬場景. \n base (基座) 長度 1m, link1 長度 0.4m, link2 長度 0.6m, link3 長度 0.9m, 各轉軸均為 HingeJoint, joint1 旋轉速度設定為 1radian/sec. \n part3: \n 模擬場景啟動後, 按下 s 鍵機構開始作動, 按下 p 鍵後機構暫停. \n 參考資料: \n cd2025_hw1_demo.7z \n HW2 (5%):  建立由 CAD 繪製零件組成的平面四連桿機構 Webots 模擬場景 \n 各學員請利用 CAD 系統依據 HW1 的連桿尺寸與運動方式, 配置適當大小的旋轉軸以及基座後, 利用 Webots R2025a 完成一個簡單的平面四連桿機構模擬場景. \n 參考資料: \n fourbar_slvs.7z \n HW3 (20%): 建立 Webots 桌上籃球遊戲機模擬系統 \n 請各分組利用CAD 系統建立一個能在電腦桌 (1600W X 700D X 740H mm) 上運作的投籃機構 ( 參考影片 )後, 導入 Webots R2025a 套件, 建立一個能由使用者透過鍵盤按鍵操作, 且具備計分板的籃球遊戲機模擬系統. \n 參考資料: \n 參考資料: \n fourbar_ball_throwing_linkage.slvs \n sixbar_ball_throwing_linkage.slvs \n \n', 'tags': '', 'url': 'Homework.html'}, {'title': 'HW1', 'text': 'HW1 (5%):  建立由 Box 組成的平面四連桿機構 Webots 模擬場景 \n 操作影片標題: 國立虎尾科技大學 - 機械設計工程系 - cd2025 HW1 - 學員學號 \n \n', 'tags': '', 'url': 'HW1.html'}, {'title': 'HW2', 'text': 'HW2 (5%):  建立由 CAD 繪製零件組成的平面四連桿機構 Webots 模擬場景 \n 操作影片標題: 國立虎尾科技大學 - 機械設計工程系 - cd2025 HW2 - 學員學號 \n \n', 'tags': '', 'url': 'HW2.html'}, {'title': 'HW3', 'text': 'HW3 (20%): 建立 Webots 桌上籃球遊戲機模擬系統 \n 操作影片標題: 國立虎尾科技大學 - 機械設計工程系 - cd2025 HW3 - 學員學號 \n \n', 'tags': '', 'url': 'HW3.html'}, {'title': 'Midterm', 'text': '本課程所繳交的期中成績為學員自評之學習期望成績. \n 期中考週的自評期望成績繳交流程: \n \n 整理先前所完成的各週的進度、作業網頁內容以及心得 \n 拍攝期中自評影片, 上傳至 Youtube 後, 以" 國立虎尾科技大學 - 機械設計工程系 - cd2025 期中自評- 學員學號 "為影片標題後嵌入本頁面中 \n 回填期中自評表單 \n 上傳學員期中成績 \n \n 各週進度: \n 各週網頁內容: \n 期中心得: \n 期中自評影片: \n \n \n', 'tags': '', 'url': 'Midterm.html'}, {'title': 'Exam', 'text': 'Exam1 (10%): 建立 Webots 基本物件模擬場景 \n 各學員利用 Webots R2025a 套件中的 Shape 物件, 隨堂建立指定的機電系統模擬場景, 並利用 Python 程式進行互動控制. \n Exam2 (10%): 利用 CAD 零組件建立模擬場景\xa0 \n 各學員利用 CAD (Solvespace 與 NX2312), 隨堂建立指定的系統模型零組件後, 導入 Webots R2025a 後, 建立機電系統模擬場景, 並利用 Python 程式進行互動控制. \n Exam3 (20%): Webots 機電模擬場景的協同設計 \n 各分組利用 CAD (Solvespace 與 NX2312), 隨堂建立指定的系統模型零組件後, 導入 Webots R2025a 後, 建立機電系統模擬場景, 並利用 Python 程式進行互動控制. 過程中各學員必須採同步協同模式, 維護從 Github Classroom 取得的分組協同倉儲以及網站. \n 協同分組方式: \n \n 分配學員負責利用 Solvespace 建立系統零組件, 過程中必須將所建構之零組件檔案與繪圖過程影片上傳至分組網頁. \n 分配學員負責利用 NX2312 建立系統零組件, 過程中必須將所建構之零組件檔案與繪圖過程影片上傳至分組網頁. \n 分配學員負責利用 Webots 建立機電系統模擬場景, 並利用 Python 程式進行控制, 過程中必須將建構過程拍成帶有說明字幕的影片上傳至分組網頁. \n \n', 'tags': '', 'url': 'Exam.html'}, {'title': 'Exam1', 'text': 'Exam1 (10%): 建立 Webots 基本物件模擬場景 \n 操作影片標題: 國立虎尾科技大學 - 機械設計工程系 - cd2025 Exam1 - 學員學號 \n', 'tags': '', 'url': 'Exam1.html'}, {'title': 'Exam2', 'text': 'Exam2 (10%): 利用 CAD 零組件建立模擬場景 \n 操作影片標題: 國立虎尾科技大學 - 機械設計工程系 - cd2025 Exam2 - 學員學號 \n', 'tags': '', 'url': 'Exam2.html'}, {'title': 'Exam3', 'text': 'Exam3 (20%): Webots 機電模擬場景的協同設計 \n 操作影片標題: 國立虎尾科技大學 - 機械設計工程系 - cd2025 Exam3 - 學員學號 \n', 'tags': '', 'url': 'Exam3.html'}, {'title': 'Final', 'text': '期末協同專案執行過程影片、簡報與 PDf 報告檔案 (六人一組) (30%) \n 題目:  Webots 動態投籃模擬系統的協同設計 \n 說明:  \n 籃框架被配置在一定範圍內, 可隨機慢速前進、後退及左右擺動, 投籃機構系統帶有一定數量的籃球, 被配置在可自由移動的輪車上. \n 操作者可利用鍵盤特定按鍵控制投籃輪車的移動並發射投籃, 每投出一球後系統透過記分板進行計分, 並由送球機構進行補球或移動輪車取球, 遊戲可進行至全部數量籃球投完為止. \n 請將期末協同專案執行過程、內容與心得, 製作成影片，配合字幕上傳至 Youtube 後嵌入各階段的期末報告頁面中. \n 影片標題:  國立虎尾科技大學 - 機械設計工程系 - cd2025 期末報告 - 學員學號 - 各階段影片主題 \n', 'tags': '', 'url': 'Final.html'}, {'title': 'Brython', 'text': '1 add to 100 \n  導入 brython 程式庫  \n \n \n \n \n  啟動 Brython  \n \n \n \n  導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  導入 gearUtils-0.9.js Cango 齒輪繪圖程式庫  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["kw_py_src1"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n \n \n \n  add 1 to 100 開始  \n \n \n  add 1 to 100 結束 \n  editor1 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div1 作為切入位置  \n \n  editor1 結束   ##########################################  \n 從 1 累加到 100 part2: \n 1 add to 100 cango_three_gears BSnake AI Tetris \n  請注意, 這裡使用 Javascript 將 localStorage["kw_py_src2"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n  add 1 to 100 part2 開始  \n \n \n  add 1 to 100 part2 結束 \n  editor2 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div1 作為切入位置  \n \n  editor2 結束  \n \n \n', 'tags': '', 'url': 'Brython.html'}]};