export type IconNames = "tick" | "dropdownSymbol" | "leq" | "plus" | "arrow";
export type IconProps = {
  iconName: IconNames;
  width?: string;
  height?: string;
  color: string;
};
export function Icon({
  iconName,
  width = "24",
  height = "24",
  color,
}: IconProps) {
  switch (iconName) {
    case "tick":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 1L3.14286 7.25L1 4.75"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "dropdownSymbol":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 2.94507L9.297 2.25L4.9935 6.38062L4.5345 5.93994L4.537 5.94238L0.713501 2.27246L0 2.95703C1.0565 3.97153 4.007 6.8035 4.9935 7.75C5.7265 7.047 5.012 7.73257 10 2.94507Z"
            fill={color}
          />
        </svg>
      );

    case "leq":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_8_421)">
            <path
              d="M2.03859 5.02032L9.10289 7.82978C9.53391 7.97111 10.0102 7.77025 10.1665 7.38095L10.4498 6.67595C10.6064 6.28665 10.3837 5.85634 9.95273 5.71501L5.84086 4.12009L9.95555 2.52423C10.3842 2.38361 10.6057 1.9554 10.4501 1.56822L10.1681 0.866966C10.0125 0.479544 9.53859 0.279622 9.10992 0.420247L2.03859 3.23181C1.71586 3.33775 1.5 3.62111 1.5 3.93915V4.31322C1.5 4.63103 1.71586 4.91439 2.03859 5.02032ZM10.6875 9.37501H1.3125C1.00195 9.37501 0.75 9.62673 0.75 9.93751V11.0625C0.75 11.3731 1.00195 11.625 1.3125 11.625H10.6875C10.998 11.625 11.25 11.3731 11.25 11.0625V9.93751C11.25 9.62673 10.998 9.37501 10.6875 9.37501Z"
              fill={color}
            />
          </g>
          <defs>
            <clipPath id="clip0_8_421">
              <rect width="12" height="12" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );

    case "plus":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 12H15"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 9V15"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke={color}
            strokeWidth="2"
          />
        </svg>
      );
    case "arrow":
      return (
        <svg
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.3999 7L21.4999 12L16.3999 17"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.5 12H19.2"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
