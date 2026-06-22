type FlameEmblemProps = {
  className?: string
}

export function FlameEmblem(props: FlameEmblemProps) {
  return (
    <svg
      aria-hidden="true"
      className={props.className}
      fill="none"
      viewBox="0 0 64 64"
    >
      <circle cx="32" cy="32" fill="#fff4d1" r="29" stroke="#d7a457" strokeWidth="3" />
      <path
        d="M34.2 13.5c1.4 7.7-5.8 10.4-2.4 17.2 1.2-4.1 4.3-6.3 7.7-9.4.7 6.1 7.8 9.7 7.8 18 0 9-6.9 15.7-15.4 15.7S16.7 48.6 16.7 40c0-7 4.2-11.6 9.5-16.2-.2 5 1 8.4 3.8 10.6-1.1-8.3 1.2-13.5 4.2-20.9Zm-1.8 23.2c-4.4 4.1-6.6 6.7-6.6 10 0 3.7 2.8 6.5 6.5 6.5 3.8 0 6.7-2.9 6.7-6.8 0-3.4-2.4-5.8-4.8-8.1.1 3.2-.8 5.2-2.6 6.6.3-3.1.1-5.5.8-8.2Z"
        fill="#982f10"
      />
    </svg>
  )
}
