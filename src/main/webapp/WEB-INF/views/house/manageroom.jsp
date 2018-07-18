<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Probably the most complete UI kit out there. Multiple functionalities and controls added,  extended color palette and beautiful typography, designed as its own extended version of Bootstrap at  the highest level of quality.                             ">
    <meta name="author" content="Webpixels">
    <title>메물관리</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700,800|Roboto:400,500,700" rel="stylesheet">
    <!-- Theme CSS -->
    <link type="text/css" href="../assets/css/theme.css" rel="stylesheet">
    <!-- Demo CSS - No need to use these in your project -->
    <link type="text/css" href="../assets/css/demo.css" rel="stylesheet">
  </head>
  <body>
    <%@ include file ="nav.jsp" %>
    <main class="main">
	<section class="slice" name="intro"> 
		<div class="container">
			<div class="justify-content-center">
				<div class="pt-lg-md">
					<h2 class="h1 mb-4">매물관리</h2>
				    <!-- 로그인된 아이디에 등록한 매물이 없다면, -->
					<p class="lead lh-180">
						일반회원은 1개의 매물만 등록이 가능합니다.<br><br>
						- 공개중: 내가 등록한 매물이 공개중인 상태<br>
						- 거래완료: 등록한 매물이 거래완료된 상태<br> 
						- 검수반려: 운영원칙 위배 또는 신고로 비공개된 상태<br>
					</p>
					<br><br><br>
					<!-- 로그인된 아이디에 등록한 매물이 있다면,  -->
					<div align="right">
						<select>
							<option value="allacount">전체 계정</option> <!-- 해당 공인중개사에 있는 계정을 선택하여 볼 수 있다. -->
							<option value="firstaccount">1번 계정</option>
							<option value="secondaccount">2번 계정</option>
						</select>
						&nbsp;&nbsp;&nbsp;검색&nbsp;<input placeholder="매물번호/제목/메모">
						<button type="button" class="btn btn-sm btn-outline-dark">검색</button> 
					</div>
					<div class="btn-group" role="group" style="width:100%; margin:10px 0 10px 0">
				        <button type="button" class="btn btn-outline-dark" style="width:100%">전체</button>
				        <button type="button" class="btn btn-outline-dark" style="width:100%">광고 진행</button>
				        <button type="button" class="btn btn-outline-dark" style="width:100%">광고 종료</button>
				        <button type="button" class="btn btn-outline-dark" style="width:100%">거래 완료</button>
				        <button type="button" class="btn btn-outline-dark" style="width:100%">검수 반려</button>
			       	</div>
			       	<div>
			       		<table class="table talbe-hover align-items-center">
			       			<tbody>
			       				<tr>
			       					<td>
			       						330001<br>
			       						[현태 상태]<br>
			       						ex,<br>
			       						[광고 종료]
			       					</td>
			       					<td>
			       						사진 넣는 곳
			       					</td>
			       					<td>
			       						원룸 월세 1000/50<br>
			       						서울특별시 금천구 가산동 가산디지털단지 근처. 가격대비 넓은방
			       					</td>
			       					<td>
			       						<textarea placeholder="[메모]&#10;등록자만 볼 수 있는 비공개 메모입니다." rows="3" cols="30"></textarea>
			       					</td>
			       					<td>
			       						2015-12-21 | 조회수 445 | 찜 1<br>
										<div class="btn-group" role="group">
											<button class="btn btn-sm btn-outline-dark">수정</button>
											<button class="btn btn-sm btn-outline-dark">삭제</button>
											<button class="btn btn-sm btn-outline-dark">광고재등록</button>
										</div>
			       					</td>
			       				</tr>
			       				<tr>
			       					<td>
			       						330001<br>
			       						[현태 상태]<br>
			       						ex,<br>
			       						[광고 종료]
			       					</td>
			       					<td>
			       						사진 넣는 곳
			       					</td>
			       					<td>
			       						원룸 월세 1000/50<br>
			       						서울특별시 금천구 가산동 가산디지털단지 근처. 가격대비 넓은방
			       					</td>
			       					<td>
			       						<textarea placeholder="[메모]&#10;등록자만 볼 수 있는 비공개 메모입니다." rows="3" cols="30"></textarea>
			       					</td>
			       					<td>
			       						2015-12-21 | 조회수 445 | 찜 1<br>
										<div class="btn-group" role="group">
											<button class="btn btn-sm btn-outline-dark">수정</button>
											<button class="btn btn-sm btn-outline-dark">삭제</button>
											<button class="btn btn-sm btn-outline-dark">광고재등록</button>
										</div>
			       					</td>
			       				</tr>
			       				<tr>
			       					<td>
			       						330001<br>
			       						[현태 상태]<br>
			       						ex,<br>
			       						[광고 종료]
			       					</td>
			       					<td>
			       						사진 넣는 곳
			       					</td>
			       					<td>
			       						원룸 월세 1000/50<br>
			       						서울특별시 금천구 가산동 가산디지털단지 근처. 가격대비 넓은방
			       					</td>
			       					<td>
			       						<textarea placeholder="[메모]&#10;등록자만 볼 수 있는 비공개 메모입니다." rows="3" cols="30"></textarea>
			       					</td>
			       					<td>
			       						2015-12-21 | 조회수 445 | 찜 1<br>
										<div class="btn-group" role="group">
											<button class="btn btn-sm btn-outline-dark">수정</button>
											<button class="btn btn-sm btn-outline-dark">삭제</button>
											<button class="btn btn-sm btn-outline-dark">광고재등록</button>
										</div>
			       					</td>
			       				</tr>
			       				<tr>
			       					<td>
			       						330001<br>
			       						[현태 상태]<br>
			       						ex,<br>
			       						[광고 종료]
			       					</td>
			       					<td>
			       						사진 넣는 곳
			       					</td>
			       					<td>
			       						원룸 월세 1000/50<br>
			       						서울특별시 금천구 가산동 가산디지털단지 근처. 가격대비 넓은방
			       					</td>
			       					<td>
			       						<textarea placeholder="[메모]&#10;등록자만 볼 수 있는 비공개 메모입니다." rows="3" cols="30"></textarea>
			       					</td>
			       					<td>
			       						2015-12-21 | 조회수 445 | 찜 1<br>
										<div class="btn-group" role="group">
											<button class="btn btn-sm btn-outline-dark">수정</button>
											<button class="btn btn-sm btn-outline-dark">삭제</button>
											<button class="btn btn-sm btn-outline-dark">광고재등록</button>
										</div>
			       					</td>
			       				</tr>
			       				<tr>
			       					<td>
			       						330001<br>
			       						[현태 상태]<br>
			       						ex,<br>
			       						[광고 종료]
			       					</td>
			       					<td>
			       						사진 넣는 곳
			       					</td>
			       					<td>
			       						원룸 월세 1000/50<br>
			       						서울특별시 금천구 가산동 가산디지털단지 근처. 가격대비 넓은방
			       					</td>
			       					<td>
			       						<textarea placeholder="[메모]&#10;등록자만 볼 수 있는 비공개 메모입니다." rows="3" cols="30"></textarea>
			       					</td>
			       					<td>
			       						2015-12-21 | 조회수 445 | 찜 1<br>
										<div class="btn-group" role="group">
											<button class="btn btn-sm btn-outline-dark">수정</button>
											<button class="btn btn-sm btn-outline-dark">삭제</button>
											<button class="btn btn-sm btn-outline-dark">광고재등록</button>
										</div>
			       					</td>
			       				</tr>
			       			</tbody>
			       		</table>
			       		<hr>
			       	</div>
				</div>
			</div>
		</div>
	</section>
    </main>
    <footer class="pt-5 pb-3 footer  footer-dark bg-tertiary">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-4">
            <div class="pr-lg-5">
              <h1 class="heading h6 text-uppercase font-weight-700 mb-3"><strong>Boomerang</strong> UI Kit</h1>
              <p>Boomerang is a high quality UI Kit built on top of the well known Bootstrap 4 Framework. This theme was designed as its own extended version of Bootstrap with multiple functionalities and controls added, extended color palette and beautiful typography.</p>
            </div>
          </div>
          <div class="col-6 col-md">
            <h5 class="heading h6 text-uppercase font-weight-700 mb-3">Features</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="#">Cool stuff</a></li>
              <li><a class="text-muted" href="#">Random feature</a></li>
              <li><a class="text-muted" href="#">Team feature</a></li>
              <li><a class="text-muted" href="#">Stuff for developers</a></li>
              <li><a class="text-muted" href="#">Another one</a></li>
              <li><a class="text-muted" href="#">Last time</a></li>
            </ul>
          </div>
          <div class="col-6 col-md">
            <h5 class="heading h6 text-uppercase font-weight-700 mb-3">Solutions</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="#">Resource</a></li>
              <li><a class="text-muted" href="#">Resource name</a></li>
              <li><a class="text-muted" href="#">Another resource</a></li>
              <li><a class="text-muted" href="#">Final resource</a></li>
            </ul>
          </div>
          <div class="col-6 col-md">
            <h5 class="heading h6 text-uppercase font-weight-700 mb-3">Resources</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="#">Business</a></li>
              <li><a class="text-muted" href="#">Education</a></li>
              <li><a class="text-muted" href="#">Government</a></li>
              <li><a class="text-muted" href="#">Gaming</a></li>
            </ul>
          </div>
          <div class="col-6 col-md">
            <h5 class="heading h6 text-uppercase font-weight-700 mb-3">About</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="#">Team</a></li>
              <li><a class="text-muted" href="#">Locations</a></li>
              <li><a class="text-muted" href="#">Privacy</a></li>
              <li><a class="text-muted" href="#">Terms</a></li>
            </ul>
          </div>
        </div>
        <hr>
        <div class="d-flex align-items-center">
          <span class="">
            &copy; 2018 <a href="https://webpixels.io/" class="footer-link" target="_blank">Webpixels</a>. All rights reserved.
          </span>
          <ul class="nav ml-lg-auto">
            <li class="nav-item">
              <a class="nav-link active" href="https://instagram.com/webpixelsofficial" target="_blank"><i class="fab fa-instagram"></i></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://facebook.com/webpixels" target="_blank"><i class="fab fa-facebook"></i></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://github.com/webpixels" target="_blank"><i class="fab fa-github"></i></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://dribbble.com/webpixels" target="_blank"><i class="fab fa-dribbble"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
    <!-- Core -->
    <script src="../assets/vendor/jquery/jquery.min.js"></script>
    <script src="../assets/vendor/popper/popper.min.js"></script>
    <script src="../assets/js/bootstrap/bootstrap.min.js"></script>
    <!-- FontAwesome 5 -->
    <script src="../assets/vendor/fontawesome/js/fontawesome-all.min.js" defer></script>
    <!-- Page plugins -->
    <script src="../assets/vendor/bootstrap-select/js/bootstrap-select.min.js"></script>
    <script src="../assets/vendor/bootstrap-tagsinput/bootstrap-tagsinput.min.js"></script>
    <script src="../assets/vendor/input-mask/input-mask.min.js"></script>
    <script src="../assets/vendor/nouislider/js/nouislider.min.js"></script>
    <script src="../assets/vendor/textarea-autosize/textarea-autosize.min.js"></script>
    <!-- Theme JS -->
    <script src="../assets/js/theme.js"></script>
  </body>
</html>