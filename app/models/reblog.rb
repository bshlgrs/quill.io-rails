class Reblog < ActiveRecord::Base
  has_many :reblogs, as: :rebloggable
  belongs_to :rebloggable, polymorphic: true
  belongs_to :user

  def reblog_descendents
    reblogs.length + reblogs.map(&:reblog_descendents).sum
  end

  def get_condensed_body
    # Remove all quotes at the start. Replace quotes in the middle with [...].

    condense(body.split("\n"))
  end

  def condense(lines)
    output = []

    state = :initial
    lines.each do |line|
      case state
      when :initial
        if line.strip[0] == ">"
          # do nothing
          state = :initial
        else
          output << line
          state = :reading_text
        end
      when :reading_text
        if line.strip[0] == ">"
          output << "[...]"
          state = :reading_quote
        else
          output << line
          state = :reading_text
        end
      when :reading_quote
        if line.strip[0] == ">"
          # do nothing
          state = :reading_quote
        else
          output << line
          state = :reading_text
        end
      end
    end

    output.join("\n")
  end
end
