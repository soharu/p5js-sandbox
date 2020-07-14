import sys
import json

def main(argv):
    if len(argv) != 3:
        print(f"Usage: {argv[0]} input-file max-count")
        return

    max_count = int(argv[2])

    with open(argv[1], 'r') as input_file:
        result = []
        for line in input_file:
            arr = list(map(lambda x: int(x), line.split()))
            if len(arr) == 1024:
                result.append(arr)
            if len(result) == max_count:
                break
        print(json.dumps(result))

if __name__ == "__main__":
    main(sys.argv)
