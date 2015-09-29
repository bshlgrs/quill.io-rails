class TictactoeController < ApplicationController
  def move
    if params["board"].nil?
      render text: "please include a board parameter", status: 400
      return
    end

    sent_board = Board.from_string(params["board"])

    if sent_board
      if sent_board.is_valid?
        if sent_board.plausibly_the_turn_of_o?
          p sent_board.winner 

          if sent_board.make_move_for_o
            render text: sent_board.to_wave_string
          else
            render text: "error: there is nowhere o can move.", status: 400  
          end
        else
          render text: "error: it is not plausibly the turn of o.", status: 400
        end
      else
        render text: "error: this board has an inbalanced number of heads and tails", status: 400
      end
    else
      render text: "error: this was not a valid board", status: 400
    end
  end
end

class Board
  attr_accessor :grid

  def initialize(grid)
    @grid = grid
  end

  def self.from_string(string)
    # todo: error handling

    return nil unless string.length == 9

    grid = [0, 1, 2].map do |row_index|
      [0, 1, 2].map do |col_index|
        case string[row_index * 3 + col_index]
        when "x"
          :cross
        when "o"
          :nought
        when " "
          nil
        else
          return nil
        end
      end
    end

    Board.new(grid)
  end

  def to_wave_string
    flattened_grid.map do |x|
      case x
      when :cross
        "x"
      when :nought
        "o"
      when nil
        " "
      end
    end.join("")
  end

  def flattened_grid
    @grid.flatten
  end

  def count_mark(mark)
    flattened_grid.count(mark)
  end

  def is_valid?
    (count_mark(:nought) - count_mark(:cross)).abs < 2
  end

  def plausibly_the_turn_of_o?
    # what do I do if the board is invalid?
    count_mark(:nought) == count_mark(:cross) || count_mark(:nought) == count_mark(:cross) - 1
  end

  def make_move_for_o
    # all of the mutability in this code makes me sad :(

    # win if you can
    [0, 1, 2].each do |row|
      [0, 1, 2].each do |col|
        if @grid[row][col].nil?
          @grid[row][col] = :nought
          if winner == :nought
            return [row, col]
          else
            @grid[row][col] = nil
          end
        end
      end
    end

    # block if you can
    [0, 1, 2].each do |row|
      [0, 1, 2].each do |col|
        if @grid[row][col].nil?
          @grid[row][col] = :cross
          if winner == :cross
            @grid[row][col] = :nought
            return [row, col]
          else
            @grid[row][col] = nil
          end
        end
      end
    end

    # if you're playing second, go for the center with your first move
    if count_mark(:cross) == 1
      if @grid[1][1].nil?
        @grid[1][1] = :nought
        return [1, 1]
      end
    end

    # move wherever
    [0, 1, 2].each do |row|
      [0, 1, 2].each do |col|
        if @grid[row][col].nil?
          @grid[row][col] = :nought
          return [row, col]
        end
      end
    end

    return nil
  end

  def make_move(piece, x, y)
    if @grid[x][y] == nil
      string = grid.to_wave_string
      string[x + y * 3] = piece == :nought ? "o" : x
      Board.from_string(string)
    else
      raise new RuntimeException
    end
  end

  def is_over?
    ! flattened_grid.contains?(nil)
  end

  def winner
    # If two players have won, the output of this function is undefined.
    horizontals = @grid
    verticals = @grid.transpose

    up_diagonal = [@grid[0][0], @grid[1][1], @grid[2][2]]
    down_diagonal = [@grid[2][0], @grid[1][1], @grid[0][2]]

    lines = horizontals + verticals + [up_diagonal, down_diagonal]
    
    lines.each do |line|
      return :nought if line.all? { |x| x == :nought }
      return :cross if line.all? { |x| x == :cross }
    end
    nil
  end
end

