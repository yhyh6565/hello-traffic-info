#!/bin/bash

# Convert .mov files to .mp3 format
# Requires ffmpeg to be installed

echo "Starting audio conversion from .mov to .mp3..."

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null
then
    echo "Error: ffmpeg is not installed. Please install it first:"
    echo "  macOS: brew install ffmpeg"
    echo "  Ubuntu: sudo apt-get install ffmpeg"
    exit 1
fi

# Convert A-01 through A-10
for i in $(seq -f "%02g" 1 10)
do
    input="public/audio/A-$i.mov"
    output="public/audio/A-$i.mp3"

    if [ -f "$input" ]; then
        echo "Converting $input to $output..."
        ffmpeg -i "$input" -vn -acodec libmp3lame -q:a 2 "$output" -y

        if [ $? -eq 0 ]; then
            echo "✓ Successfully converted A-$i"
        else
            echo "✗ Failed to convert A-$i"
        fi
    else
        echo "⚠ Warning: $input not found, skipping..."
    fi
done

echo ""
echo "Conversion complete!"
echo "You can now delete the .mov files if the conversion was successful."
