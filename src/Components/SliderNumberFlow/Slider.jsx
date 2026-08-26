import NumberFlow from "@number-js/number-flow";
import * as RadixSlider from "@radix-ui/react-slider";
import clsx from "clsx";

/**
 * Drag-value bubble easing — a snappy overshoot-then-settle curve.
 * Same curve as the original component; kept as a named constant so it's
 * easy to reuse/tune in one place.
 */
const BUBBLE_EASING =
  "linear(0, 0.0033 0.8%, 0.0263 2.39%, 0.0896 4.77%, 0.4676 15.12%, 0.5688, 0.6553, 0.7274, 0.7862, 0.8336 31.04%, 0.8793, 0.9132 38.99%, 0.9421 43.77%, 0.9642 49.34%, 0.9796 55.71%, 0.9893 62.87%, 0.9952 71.62%, 0.9983 82.76%, 0.9996 99.47%)";

/**
 * @param {number} value - current value (plain number, not an array)
 * @param {(value: number) => void} onChange
 * @param {string} [prefix] - e.g. "₹"
 * @param {string} [suffix] - e.g. "%" or "Yrs"
 * @param {string} [ariaLabel]
 * @param {boolean} [showBubble] - show the floating NumberFlow value above the thumb while dragging
 */
export default function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  prefix,
  suffix,
  ariaLabel,
  showBubble = true,
  className,
  ...props
}) {
  return (
    <RadixSlider.Root
      {...props}
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={([v]) => onChange(v)}
      className={clsx(
        className,
        "relative flex h-5 w-full touch-none select-none items-center"
      )}
    >
      <RadixSlider.Track className={clsx('relative', 'h-[3px]', 'grow', 'rounded-full', 'bg-white/10')}>
        <RadixSlider.Range className={clsx('absolute', 'h-full', 'rounded-full', 'bg-cyan-400')} />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className={clsx('relative', 'block', 'h-5', 'w-5', 'rounded-full', 'bg-white', 'shadow-md', 'ring-2', 'ring-cyan-400/40', 'focus:outline-none', 'focus-visible:ring-cyan-400')}
        aria-label={ariaLabel || "Value"}
      >
        {showBubble && value != null && (
          <div className={clsx('pointer-events-none', 'absolute', 'bottom-8', 'left-1/2', 'flex', '-translate-x-1/2', 'items-center', 'gap-0.5', 'whitespace-nowrap', 'rounded-md', 'bg-black/85', 'px-2', 'py-1', 'text-sm', 'font-semibold', 'text-white')}>
            {prefix && <span>{prefix}</span>}
            <NumberFlow
              willChange
              value={value}
              isolate
              continuous
              opacityTiming={{ duration: 250, easing: "ease-out" }}
              transformTiming={{ easing: BUBBLE_EASING, duration: 500 }}
            />
            {suffix && <span>{suffix}</span>}
          </div>
        )}
      </RadixSlider.Thumb>
    </RadixSlider.Root>
  );
}

export { Slider };