package first_project;

public class Rectangle {
	
	private int width;
	private int height;
	private static int COUNT = 0;
	
	public Rectangle(int width) {
		COUNT++;
		this.width = width;
	}
	
	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public int area() {
		return width * height;
	}

	public static int getCount() {
		return COUNT;
	}

}
