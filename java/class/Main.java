package first_project;

import java.util.Scanner;
import java.util.ArrayList;

public class Main {
	
	public static void main(String[] args) {
		
		Scanner scanner = new Scanner(System.in);
		ArrayList<Rectangle> arr = new ArrayList<>();
		
		while(true) {
			System.out.println("사각형의 가로와 세로 길이를 띄어쓰기를 기준으로 입력해주세요.");
			int num1 = scanner.nextInt();
			int num2 = scanner.nextInt();
			
			if (num1 == 0 && num2 == 0) break;
			
			Rectangle rectangle = new Rectangle(num1);
			rectangle.setHeight(num2);
			arr.add(rectangle);
		}
		
		for (Rectangle rect : arr) {
			System.out.println("가로 길이는 : " + rect.getWidth());
			System.out.println("세로 길이는 : " + rect.getHeight());
			System.out.println("넓이는 : " + rect.area());
			System.out.println("----------------------------------");
		}

		System.out.println("Rectangle 인스턴스의 개수는 : " + Rectangle.getCount());
		
	}
}
