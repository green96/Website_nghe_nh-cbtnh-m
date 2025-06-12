const boy = document.getElementById('boy_character');//Lấy phần tử HTML có id="boy_character" và gán nó vào biến boy.(Đây là phần tử đại diện cho nhân vật "boy" trên trang.)

let positionX = 100;//Biến positionX lưu vị trí ngang (theo trục X) của nhân vật trên màn hình tính bằng pixel (Ban đầu, nhân vật sẽ được đặt ở vị trí cách mép trái 100px.)
let direction = 1; // 1 = right, -1 = left(Biến direction xác định hướng di chuyển của nhân vật:(1: di chuyển sang phải)(-1: di chuyển sang trái)


//Định nghĩa một hàm tên là moveBoy, sẽ được gọi mỗi giây để di chuyển nhân vật.
function moveBoy() {

  // Random step: 50 to 150 pixels
  const step = Math.floor(Math.random() * 100) + 50;//Tạo một bước di chuyển ngẫu nhiên từ 50 đến 149 pixel
  //Math.random() * 100: tạo số thực từ 0 đến 99.999..., 
  //Math.floor(...): làm tròn xuống
  //+ 50: đảm bảo bước đi luôn ≥ 50

  //Random direction(Ngẫu nhiên thay đổi hướng di chuyển)
  //Nếu Math.random() > 0.5 thì hướng là 1 (sang phải), Ngược lại là -1 (sang trái)
  direction = Math.random() > 0.5 ? 1 : -1;//đổ dữ liệu số từ hàm Math.random() vô biến direction ==> biến direction sẽ nhận số ngẫu nhiên

  //Cập nhật vị trí mới theo hướng và bước:
  //Nếu direction = 1, thì positionX tăng lên → nhân vật đi sang phải
  //Nếu direction = -1, thì positionX giảm đi → nhân vật đi sang trái
  positionX += direction * step;

  // Keep character within screen bounds(Giới hạn vị trí X nằm trong khung màn hình)
  //window.innerWidth: chiều rộng cửa sổ trình duyệt
  //Math.max(0, ...): không cho nhân vật ra ngoài bên trái(đảm bảo rằng positionX không nhỏ hơn 0)
  //Math.min(window.innerWidth - 80, positionX): đảm bảo nhân vật không vượt ra ngoài biên phải (giả sử nhân vật rộng 80px)
  positionX = Math.max(0, Math.min(window.innerWidth - 80, positionX));


  //Cập nhật vị trí trên trang web:
  boy.style.left = positionX + 'px';//Gán giá trị left mới cho phần tử HTML boy để di chuyển nó theo chiều ngang.

  // Flip image based on direction(Lật hình ảnh nhân vật theo hướng di chuyển)
  //scaleX(1): giữ nguyên hình
  //scaleX(-1): lật hình ngang (quay mặt sang trái)
  // 1 hay -1 se phu thuoc bao bien direction 
  boy.querySelector('img').style.transform = `scaleX(${direction})`;
  //element.querySelector(selector): là một phương thức trong JavaScript dùng để tìm phần tử HTML đầu tiên khớp với một bộ chọn CSS (CSS selector)
  //element: phần tử cha mà bạn muốn tìm trong đó (có thể là document hoặc một phần tử HTML cụ thể)
  //selector: là chuỗi bộ chọn CSS như .class, #id, div > img, v.v.
  //Trả về phần tử đầu tiên tìm thấy phù hợp, hoặc null nếu không có.
}

// Move every second
setInterval(moveBoy, 1000);//Gọi hàm moveBoy() mỗi 1000ms (1 giây), tạo hiệu ứng nhân vật đi qua lại liên tục trên màn hình.
//setInterval(function, delay); function: là hàm bạn muốn gọi lặp lại,delay: thời gian chờ giữa mỗi lần gọi (tính bằng mili giây = 1/1000 giây)
//setInterval là một hàm có sẵn trong JavaScript dùng để gọi một hàm hoặc đoạn mã lặp đi lặp lại theo chu kỳ thời gian cố định (tính bằng mili giây).