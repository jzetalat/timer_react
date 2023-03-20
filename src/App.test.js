import { render, screen, fireEvent, act} from '@testing-library/react';
import Timer from './Components/Timer/timer';

describe('Timer', () => {
    it('should render start button when seconds is 0', () => {
        render(<Timer />);
        const startButton = screen.getByRole('button', { name: /start timer/i });
        expect(startButton).toBeInTheDocument();
    });


    it('should render countdown timer when seconds is not 0', () => {
        render(<Timer />);
        const startButton = screen.getByRole('button', { name: /start timer/i });
        fireEvent.click(startButton);
        const timerText = screen.getByText(/10/);
        expect(timerText).toBeInTheDocument();
    });


    it('should countdown the seconds', () => {
        jest.useFakeTimers();
        render(<Timer />);
        const startButton = screen.getByRole('button', { name: /start timer/i });
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        const timerText = screen.getByText(/9/);
        expect(timerText).toBeInTheDocument();
        jest.useRealTimers();
    });
    
    
    it('should stop countdown when clicked on the countdown', () => {
        jest.useFakeTimers();
        render(<Timer />);
        const startButton = screen.getByRole('button', { name: /start timer/i });
        fireEvent.click(startButton);
        const timer = screen.getByTestId('timer');
        fireEvent.click(timer);
        const timerText = screen.queryByText(/9/);
        expect(timerText).not.toBeInTheDocument();
        jest.useRealTimers();
    });
    

    it('should pause countdown when mouse is over countdown', () => {
        jest.useFakeTimers();
        render(<Timer />);
        const startButton = screen.getByRole('button', { name: /start timer/i });
        fireEvent.click(startButton);
        const timer = screen.getByTestId('timer');
        fireEvent.mouseEnter(timer);
        const timerText = screen.getByText(/Paused.../);
        expect(timerText).toBeInTheDocument();
        jest.useRealTimers();
    });
    

    it('should show "countdown is over" when countdown is done and mouse is over countdown', () => {
        jest.useFakeTimers();
        render(<Timer />);
        const startButton = screen.getByRole('button', { name: /start timer/i });
        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(10000);
        });
        const timer = screen.getByTestId('timer');
        fireEvent.mouseEnter(timer);
        const timerText = screen.getByText(/countdown is over/);
        expect(timerText).toBeInTheDocument();
        jest.useRealTimers();
    });  
});
