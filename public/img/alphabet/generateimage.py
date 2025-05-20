from PIL import Image, ImageDraw, ImageFont
import random
import os

# Function to generate cartoon-like images of letters with transparent background and shadow
def generate_cartoon_letter_with_vibrant_color_and_shadow(letter, font_path, font_size, image_size=(300, 300)):
    # Load the font with the specified size
    try:
        font = ImageFont.truetype(font_path, font_size)  # Use the custom font
    except IOError:
        print(f"Font not found: {font_path}")
        return

    # Create a new blank image with the desired size and transparent background
    image = Image.new('RGBA', image_size, (0, 0, 0, 0))  # Transparent background (RGBA mode)

    # Initialize the drawing context
    draw = ImageDraw.Draw(image)

    # Get the bounding box of the text (text width and height)
    bbox = font.getbbox(letter)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Get the position to center the text on the canvas
    position = ((image_size[0] - text_width) // 2, (image_size[1] - text_height) // 2)

    # Choose a random vibrant color for the letter, avoiding light colors
    color = (
        random.randint(100, 255),  # Vibrant Red range
        random.randint(100, 255),  # Vibrant Green range
        random.randint(100, 255),  # Vibrant Blue range
        255  # Full opacity
    )

    # Shadow color (dark color)
    shadow_color = (0, 0, 0, 200)  # Semi-transparent black for shadow

    # Draw the shadow by slightly offsetting the position
    shadow_offset = (5, 5)  # Offset for shadow position
    shadow_position = (position[0] + shadow_offset[0], position[1] + shadow_offset[1])

    # Draw the shadow first
    draw.text(shadow_position, letter, font=font, fill=shadow_color)

    # Draw the letter on top (centered on the original position)
    draw.text(position, letter, font=font, fill=color)

    # Save the image with transparent background
    image.save(f"{letter}.png", "PNG")  # Save as PNG to preserve transparency
    # image.show()

# Path to the "Mickey" font (adjust the font file name and path as needed)
font_path = "./Mickey.otf"  # Replace with the correct font file name

# Font size (adjust as needed)
font_size = 260  # Adjust this based on the size of the letter you want in the image

# Generate cartoon images for all alphabets (A-Z) with vibrant color and shadow
for letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
    generate_cartoon_letter_with_vibrant_color_and_shadow(letter, font_path, font_size)
